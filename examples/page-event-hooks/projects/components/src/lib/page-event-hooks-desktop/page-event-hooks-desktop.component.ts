import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Control, ControlMemberApi } from '@sassoftware/vi-api/control';
import {
  HookablePageEvents,
  IPageEvent,
  IPageEventData,
  PageEventHookRemove,
  PageMode,
  PageModel,
} from '@sassoftware/vi-api/page-model';
import { pageEventHooksAttributes } from '../shared/page-event-hooks.model';

@Component({
  selector: 'page-event-hooks-desktop-example',
  templateUrl: './page-event-hooks-desktop.component.html',
  styleUrl: '../shared/page-event-hooks.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class PageEventHooksDesktopComponent implements OnInit, OnDestroy {
  @Input() childNode!: Control<pageEventHooksAttributes>;
  @Input() pageModel!: PageModel;
  @Input() controlApi!: ControlMemberApi<pageEventHooksAttributes, 'STRING'>;

  public get labelText(): string {
    return this.childNode.typeAttributes.title?.text ?? '';
  }

  public get inView(): boolean {
    return this.controlApi.page.getMode() === PageMode.View;
  }

  public get inDesignMode(): boolean {
    return this.controlApi.page.getMode() === PageMode.Design;
  }

  public get fieldName(): string | undefined {
    return this.childNode.typeAttributes.dataSource;
  }

  public get fieldValue(): string | undefined {
    return this.controlApi.control.getFieldValue()?.toString();
  }

  public set fieldValue(newVal: string | undefined | null) {
    if (!this.fieldName) {
      throw new Error('Cannot set fieldValue for unknown fieldName');
    } else {
      this.controlApi.control.setFieldValue(newVal!);
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

  private removeHookCallbacks: PageEventHookRemove[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    // Init event hooks if control isn't in design mode
    if (this.pageModel.mode !== PageMode.Design) {
      // the control API page event hooks are scoped to the page on which the control resides.
      const objectSaveEvent = this.controlApi.page.events.getPageEvent(
        HookablePageEvents.SaveObject
      );

      if (objectSaveEvent) {
        this.setAddTextHook(objectSaveEvent);
        this.setValidationHook(objectSaveEvent);
        this.setPostSaveHook(objectSaveEvent);
      }
    }

    // Ensure page control events trigger change detection
    this.controlApi.page.onPropertyChange(() => this.cd.markForCheck());
    this.controlApi.control.state.onChange(() => this.cd.markForCheck());
    this.controlApi.page.onChange(() => this.cd.detectChanges());
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
  private setPostSaveHook(objectSaveEvent: IPageEvent<IPageEventData>): void {
    const exec = this.childNode.typeAttributes.showSuccess
      ? async () => ({
          message: `${this.fieldName} was saved with value: ${this.fieldValue}`,
        })
      : async () => {};
    const onFail = this.childNode.typeAttributes.showFail
      ? async () => ({
          message: `${this.fieldName} was not saved successfully`,
        })
      : undefined;

    const removeHookFn = objectSaveEvent.addPostHook({ exec, onFail });
    this.removeHookCallbacks.push(removeHookFn);
  }

  /**
   * If "addRequiredPrefix" property is set,
   * Add a page event hook which aborts save if the specified text is not present in the fieldValue.
   */
  private setValidationHook(objectSaveEvent: IPageEvent<IPageEventData>): void {
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
  private setAddTextHook(objectSaveEvent: IPageEvent<IPageEventData>): void {
    const order = this.HOOK_ORDER.addText;

    if (!this.childNode.typeAttributes.addText) return;

    const exec = async () => {
      const value = this.fieldValue ?? '';
      const prefix = this.childNode.typeAttributes.prefix ?? '';
      const hasPrefix = value.indexOf(prefix) === 0;

      this.fieldValue = prefix && !hasPrefix ? `${prefix}${value}` : value;
    };

    const removeHookFn = objectSaveEvent.addPreHook({ exec, order });
    this.removeHookCallbacks.push(removeHookFn);
  }
}
