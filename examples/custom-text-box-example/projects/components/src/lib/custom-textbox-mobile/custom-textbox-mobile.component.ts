import {
    Component,
    OnInit,
    Input,
    HostListener,
    ChangeDetectorRef,
    OnDestroy,
    Renderer2,
    Injector,
    ElementRef,
    CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { SmiControlApi, isMobileControlApi } from "@sassoftware/mobile-investigator";
import { ControlMemberApi as DesktopApi } from "@sassoftware/vi-api/control/control-api";
import { Control, FieldValue, FieldType } from "@sassoftware/vi-api/control";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { getDefaultValue, handleEnter, handlePaste, onInput } from "../shared/custom-textbox-utils";
import { CustomTextBoxAttributes, multiLineRows } from "../shared/custom-textbox.model";
import { PageMode } from "@sassoftware/vi-api/page-model";

@Component({
    selector: "mobile-sol-custom-textbox-mobile",
    standalone: true,
    templateUrl: "./custom-textbox-mobile.component.html",
    imports: [CommonModule, FormsModule],
    styleUrls: ["./custom-textbox-mobile.component.scss"],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomTextboxMobileComponent implements OnInit, OnDestroy {
    @Input() controlApi!: SmiControlApi<CustomTextBoxAttributes, "STRING"> | DesktopApi<CustomTextBoxAttributes, never>;
    public control?: Control;
    private cd: ChangeDetectorRef;
    private renderer: Renderer2;
    private el: ElementRef;
    private removeOnPropertyChangeMobile = () => {};
    private removeOnPropertyChangeAdmin = () => {};

    constructor(injector: Injector) {
        this.cd = injector.get(ChangeDetectorRef);
        this.renderer = injector.get(Renderer2);
        this.el = injector.get(ElementRef);
    }

    public get inView(): boolean {
        return this.controlApi.page.getMode() === PageMode.View;
    }

    public get state() {
        return this.controlApi.control.state;
    }

    public get uuid(): string | null {
        if (isMobileControlApi(this.controlApi)) {
            return this.controlApi.control.uuid;
        } else return null;
    }

    public get fieldValue(): string {
        return this.controlApi.control.getFieldValue()?.toString() || "";
    }

    public get isMultiLine(): boolean {
        return this.controlApi.control.getControl().typeAttributes.multiLine || false;
    }

    public set isMultiLine(isMultiLine: boolean) {
        if (isMobileControlApi(this.controlApi)) {
            this.controlApi.control.getControl().typeAttributes.multiLine = isMultiLine;
        }
    }

    public set fieldValue(value: string) {
        if (isMobileControlApi(this.controlApi)) {
            this.controlApi.control.setFieldValue(value);
        }
    }

    public get rows(): number {
        return this.isMultiLine ? multiLineRows : 1;
    }

    public inAdmin: boolean = false;

    public ngOnInit(): void {
        if (isMobileControlApi(this.controlApi)) {
            this.control = this.controlApi.control.getControl();
            this.controlApi.control.applyDefaultFieldValue(this.getDefaultValue());
            this.removeOnPropertyChangeMobile = this.controlApi.page.onModeChange(() => {
                this.cd.detectChanges();
            });
        } else {
            // When a mobile control is in admin this class is used for applying specific styles.
            this.renderer.addClass(this.el.nativeElement, "admin");
            this.control = this.controlApi.control.getControl();
            this.removeOnPropertyChangeAdmin = this.controlApi.page.onPropertyChange(
                (category, property, currentValue) => {
                    if (category === "typeAttributes" && property === "multiLine") {
                        this.isMultiLine = currentValue;
                    }

                    this.cd.detectChanges();
                }
            );
        }

        this.inAdmin = !isMobileControlApi(this.controlApi);
    }

    public ngOnDestroy(): void {
        this.removeOnPropertyChangeMobile();
        this.removeOnPropertyChangeAdmin();
    }

    /**
     * Gets the default value for the control, stripping CR/LFs if this isn't a multi-line control.
     * @return the default value for the control.
     */
    private getDefaultValue(): FieldType {
        const fieldDataType = this.controlApi.control.getFieldRestrictions().fieldDataType;
        const defaultValue: FieldValue | undefined = this.controlApi.control.getControl().typeAttributes.defaultValue;
        return getDefaultValue(fieldDataType, defaultValue, this.isMultiLine);
    }

    /**
     * Takes the value from the event and applies it to the page, ensuring the value is in the correct type for the field.
     * @param event The input event.
     */
    public onInput(eventTarget: EventTarget | null): void {
        const value = onInput(eventTarget);
        this.fieldValue = value;
    }

    /**
     * Handles the paste event. Ensures that newlines and carriage-returns are stripped if we're single-line.
     * @param event Browser clipboard event.
     */
    public handlePaste(event: ClipboardEvent): void {
        handlePaste(event, this.isMultiLine);
    }

    /**
     * Handles the Enter keypress event. Ensures that enter key does nothing if we're single-line.
     * @param event Browser keyboard event for "Enter" keypress.
     */
    public handleEnter(event: Event): void {
        handleEnter(event, this.isMultiLine);
    }

    // Mobile Investigator uses these custom events to set focus on validation failure focus.
    @HostListener("validationfocus", ["$event.target"])
    /**
     * Sets focus on the controls input if existing.
     * @param event Components host element.
     */
    public focusInput(host: HTMLElement): void {
        host.querySelector<HTMLElement>(
            "input:enabled, textarea:enabled, select:enabled, .masking-button.edit"
        )?.focus();
    }
}
