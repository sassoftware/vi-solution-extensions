import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import {
  SmiControlApi,
  isMobileControlApi,
} from '@sassoftware/mobile-investigator';
import { ControlMemberApi as DesktopApi } from '@sassoftware/vi-api/control/control-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HookablePageEvents, PageMode } from '@sassoftware/vi-api/page-model';
import {
  EventHookRemove,
  HookableEvent,
  SaveEventPayload,
} from '@sassoftware/mobile-investigator/src/app/mobile/page/events/events.model';
import { pageEventHooksAttributes } from '../shared/page-event-hooks.model';

@Component({
  selector: 'mobile-sol-page-event-hooks-mobile',
  standalone: true,
  templateUrl: './page-event-hooks-mobile.component.html',
  styleUrl: '../shared/page-event-hooks.component.scss',
  imports: [CommonModule, FormsModule],
})
export class PageEventHooksMobileComponent implements OnInit, OnDestroy {
  @Input() controlApi!:
    | SmiControlApi<pageEventHooksAttributes, 'STRING'>
    | DesktopApi<pageEventHooksAttributes, never>;

  public get labelText(): string {
    return (
      this.controlApi.control.getControl().typeAttributes.title?.text ?? ''
    );
  }

  public get inView(): boolean {
    return this.controlApi.page.getMode() === PageMode.View;
  }

  public get fieldName(): string | undefined {
    return this.controlApi.control.getControl().typeAttributes.dataSource;
  }

  public get fieldValue(): string | undefined {
    return this.controlApi.control.getFieldValue();
  }

  public set fieldValue(newVal: string | undefined) {
    if (isMobileControlApi(this.controlApi)) {
      this.controlApi.control.setFieldValue(newVal);
    }
  }

  public get childNode() {
    return this.controlApi.control.getControl();
  }

  public get inDesignMode(): boolean {
    if (isMobileControlApi(this.controlApi)) {
      return false;
    } else {
      return this.controlApi.page.getMode() === PageMode.Design;
    }
  }

  /**
   * The order of execution for save event hooks.
   * All pre/post event hooks are executed in ascending 'order'.
   */
  private readonly HOOK_ORDER = {
    addText: 0,
    validation: 1,
  };

  private removeHookCallbacks: EventHookRemove[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    // Init event hooks if control isn't in design mode
    if (isMobileControlApi(this.controlApi)) {
      // the control API page event hooks are scoped to the page on which the control resides.
      const objectSaveEvent = this.controlApi.page.events.getPageEvent(
        HookablePageEvents.SaveObject
      );

      if (objectSaveEvent) {
        this.setAddTextHook(objectSaveEvent);
        this.setValidationHook(objectSaveEvent);
        this.setPostSaveHook(objectSaveEvent);
      }

      // Ensure page control events trigger change detection
      this.controlApi.page.onModeChange(() => this.cd.detectChanges());
    } else {
      this.controlApi.page.onPropertyChange(() => this.cd.markForCheck());
      this.controlApi.page.onChange(() => this.cd.detectChanges());
    }
  }

  public ngOnDestroy(): void {
    // Each hook when added returns a function to remove it. In this instance we can
    // clean up on destroy and remove all added hooks which are stored in a variable.
    this.removeHookCallbacks.forEach((hook) => {
      hook();
    });
  }

  /**
   * If "showSuccess" property is set, add a page event hook which returns a success message after a successful save.
   * If "showFail" property is set, the hook will show a failure message after an unsuccessful save.
   */
  private setPostSaveHook(
    objectSaveEvent: HookableEvent<SaveEventPayload>
  ): void {
    const exec = this.controlApi.control.getControl().typeAttributes.showSuccess
      ? async () => {
          alert(`${this.fieldName} was saved with value: ${this.fieldValue}`);
        }
      : async () => {};

    const onFail = this.controlApi.control.getControl().typeAttributes.showFail
      ? async () => {
          alert(`${this.fieldName} was not saved successfully`);
        }
      : undefined;

    const removeHookFn = objectSaveEvent.addPostHook({ exec, onFail });
    this.removeHookCallbacks.push(removeHookFn);
  }

  /**
   * If "addRequiredPrefix" property is set,
   * Add a page event hook which aborts save if the specified text is not present in the fieldValue.
   */
  private setValidationHook(
    objectSaveEvent: HookableEvent<SaveEventPayload>
  ): void {
    const order = this.HOOK_ORDER.validation;
    const typeAttrs = this.controlApi.control.getControl().typeAttributes;

    if (!typeAttrs.addRequiredPrefix || !typeAttrs.requiredPrefix) return;

    const exec = async () =>
      !this.fieldValue?.startsWith(typeAttrs.requiredPrefix!)
        ? {
            message: `"${this.fieldName}" is missing required prefix: "${typeAttrs.requiredPrefix}"`,
            abort: true,
          }
        : undefined;

    const removeHookFn = objectSaveEvent.addPreHook({ exec, order });
    this.removeHookCallbacks.push(removeHookFn);
  }

  /**
   * If "addText" property is set,
   * Add a page event hook which inserts a prefix into the field before saving (if not already present)
   */
  private setAddTextHook(
    objectSaveEvent: HookableEvent<SaveEventPayload>
  ): void {
    const order = this.HOOK_ORDER.addText;

    if (!this.controlApi.control.getControl().typeAttributes.addText) return;

    const exec = async () => {
      const value = this.fieldValue ?? '';
      const prefix =
        this.controlApi.control.getControl().typeAttributes.prefix ?? '';
      const hasPrefix = value.indexOf(prefix) === 0;

      this.fieldValue = prefix && !hasPrefix ? `${prefix}${value}` : value;
    };

    const removeHookFn = objectSaveEvent?.addPreHook({ exec, order });
    this.removeHookCallbacks.push(removeHookFn);
  }
}
