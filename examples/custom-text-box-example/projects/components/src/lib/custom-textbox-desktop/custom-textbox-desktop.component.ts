import {
    Component,
    OnInit,
    Input,
    ChangeDetectorRef,
    OnDestroy,
    Injector,
    CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { Control, ControlMemberApi, FieldType, FieldValue, NumericRestrictions } from "@sassoftware/vi-api/control";
import { PageMode, PageModel } from "@sassoftware/vi-api/page-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { getDefaultValue, handleEnter, handlePaste, onInput } from "../shared/custom-textbox-utils";
import { CustomTextBoxAttributes, multiLineRows } from "../shared/custom-textbox.model";

@Component({
    selector: "sol-custom-textbox-desktop",
    standalone: true,
    templateUrl: "./custom-textbox-desktop.component.html",
    styleUrls: ["./custom-textbox-desktop.component.scss"],
    imports: [CommonModule, FormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomTextboxDesktopComponent implements OnInit, OnDestroy {
    @Input() childNode!: Control<CustomTextBoxAttributes>;
    @Input() pageModel!: PageModel;
    @Input() controlApi!: ControlMemberApi<CustomTextBoxAttributes>;
    private removeOnPropertyChange = () => {};
    private cd: ChangeDetectorRef;
    public PageMode = PageMode;

    public get inView(): boolean {
        return this.controlApi.page.getMode() === PageMode.View;
    }

    public get inDesignMode(): boolean {
        return this.controlApi.page.getMode() === PageMode.Design;
    }

    public get state() {
        return this.controlApi.control.state;
    }

    public get fieldValue(): string {
        return this.controlApi.control.getFieldValue()?.toString() || "";
    }

    public set fieldValue(value: string) {
        this.controlApi.control.setFieldValue(value);
    }

    public get isMultiLine(): boolean {
        return this.childNode.typeAttributes.multiLine || false;
    }

    public set isMultiLine(isMultiLine: boolean) {
        this.childNode.typeAttributes.multiLine = isMultiLine;
    }

    public get rows(): number {
        return this.isMultiLine ? multiLineRows : 1;
    }

    public get isFillAvailableSpace() {
        return this.childNode.typeAttributes.multiLine && this.childNode.typeAttributes.height === "";
    }

    public get height(): string | undefined {
        if (this.isFillAvailableSpace) {
            return "100%";
        } else if (!this.isFillAvailableSpace && this.isMultiLine) {
            return this.childNode.typeAttributes.height ?? "";
        } else {
            return undefined;
        }
    }

    constructor(injector: Injector) {
        this.cd = injector.get(ChangeDetectorRef);
    }

    public ngOnInit(): void {
        if (this.childNode.typeAttributes.defaultValue) {
            this.controlApi.control.setFieldValue(this.getDefaultValue());
        }

        this.controlApi.page.onChange((change) => {
            if (change.type === "mode") {
                this.cd.detectChanges();
            }
        });

        this.removeOnPropertyChange = this.controlApi.page.onPropertyChange((category, property, currentValue) => {
            if (category === "typeAttributes" && property === "multiLine") {
                this.isMultiLine = currentValue;
            }

            this.cd.detectChanges();
        });
    }

    public ngOnDestroy(): void {
        this.removeOnPropertyChange();
    }

    /**
     * Gets the default value for the control, stripping CR/LFs if this isn't a multi-line control.
     * @return the default value for the control.
     */
    private getDefaultValue(): FieldType {
        const fieldDataType = (this.controlApi.control.getFieldRestrictions() as NumericRestrictions).fieldDataType;
        const defaultValue: FieldValue | undefined = this.childNode?.typeAttributes.defaultValue;
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
}
