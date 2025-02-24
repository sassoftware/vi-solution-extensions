import {
    Component,
    Input,
    ChangeDetectorRef,
    Injector,
    CUSTOM_ELEMENTS_SCHEMA,
    OnInit,
} from "@angular/core";
import { Control, ControlMemberApi, UserGroup } from "@sassoftware/vi-api/control";
import { PageMode, PageModel } from "@sassoftware/vi-api/page-model";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IdentitySelectAttributes } from "./identity-select.control";
import { NgElement, WithProperties } from "@angular/elements";
import { IdentitySelectProperties } from "@sassoftware/vi-api/elements";

declare global {
    interface HTMLElementTagNameMap {
        'svi-identity-select': NgElement & WithProperties<IdentitySelectProperties>
    }
}

@Component({
    standalone: true,
    selector: "sol-identity-select",
    templateUrl: "./identity-select.component.html",
    styleUrl: "./identity-select.component.scss",
    imports: [CommonModule, FormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IdentitySelectionExampleComponent implements OnInit {
    @Input() childNode!: Control<IdentitySelectAttributes>;
    @Input() pageModel!: PageModel;
    @Input() controlApi!: ControlMemberApi<IdentitySelectAttributes, "STRING">;

    private cdRef: ChangeDetectorRef;

    public get inViewMode(): boolean {
        return this.controlApi.page.getMode() === PageMode.View;
    }

    public get inDesignMode(): boolean {
        return this.controlApi.page.getMode() === PageMode.Design;
    }

    public get selectedIdentities(): UserGroup[] {
        const fieldValue = this.controlApi.control.getFieldValue();
        return fieldValue ? JSON.parse(fieldValue) : [];
    }

    public set selectedIdentities(value: UserGroup[]) {
        this.controlApi.control.setFieldValue(JSON.stringify(value));
    }

    public get filterByGroups(): any {
        const groups = this.childNode.typeAttributes?.filterByGroups?.map((group) => group.id);
        return groups?.length > 0
            ? {
                byGroups: groups,
                includeNestedMembers: this.childNode.typeAttributes?.includeNestedMembers ?? false,
                includeFilteredGroups: this.childNode.typeAttributes?.includeFilteredGroups ?? false,
            }
            : undefined;
    }

    constructor(injector: Injector) {
        this.cdRef = injector.get(ChangeDetectorRef);
    }

    public ngOnInit(): void {
        this.controlApi.page.onChange(() => this.cdRef.detectChanges());
        this.controlApi.page.onPropertyChange(() => this.cdRef.detectChanges());
        this.controlApi.control.state.onChange(() => this.cdRef.detectChanges());
    }

    public onModelChanged(event: any): void {
        this.selectedIdentities = event.detail;
        this.cdRef.detectChanges();
    }
}
