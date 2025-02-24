import { ControlType } from "@sassoftware/vi-api/config";

export interface IdentitySelectAttributes {
    defaultValue?: string;
    title?: { text: string };
    inputWidthCSSClass?: string;
    selectionMode?: string;
    selfSelectBtn?: boolean;
    filterByGroups: any[];
    includeNestedMembers: boolean;
    includeFilteredGroups: boolean;
}

export const control = {
    category: "Fields",
    controlDescription: {
        defaultText: "Identity Select Example"
    },
    directiveName: "sol-identity-select",
    displayName: {
        defaultText: "Identity Select Example"
    },
    name: "SVI Identity Select Example",
    controlAttributes: {
        attributes: {
            dataSource: {
                displayName: {
                    defaultText: "Data source:"
                },
                type: "DataSource",
                limitDataSourceType: "USER_GROUP",
                required: true,
                order: 1
            },
            "title.text": {
                defaultValue: {
                    defaultText: "Identity Select Example"
                },
                displayName: {
                    defaultText: "Title text:"
                },
                type: "TextInput",
                order: 2
            },
            inputWidthCSSClass: {
                displayName: {
                    defaultText: "Width"
                },
                picklistName: "INPUT_LENGTH_OPTIONS",
                type: "Picklist",
                order: 3
            },
            selectionMode: {
                displayName: {
                    defaultText: "Selection mode:",
                },
                type: "RadioChooser",
                defaultValue: "usersAndGroups",
                radioConfig: {
                    options: [
                        {
                            value: "usersAndGroups",
                            resourceKey: "Users and Groups",
                        },
                        {
                            value: "users",
                            resourceKey: "Users",
                        },
                        {
                            value: "groups",
                            resourceKey: "Groups",
                        },
                        {
                            value: "user",
                            resourceKey: "User",
                        },
                        {
                            value: "group",
                            resourceKey: "Group",
                        },
                        {
                            value: "userOrGroup",
                            resourceKey: "User or Group",
                        },
                    ],
                },
                order: 4,
            },
            filterByGroups: {
                disabledExpression: "selectionMode === 'group' || selectionMode === 'groups'",
                displayName: {
                    defaultText: "Filter by group(s):"
                },
                type: "GroupChooser",
                order: 5,
            },
            includeNestedMembers: {
                disabledExpression: "filterByGroups.length === 0",
                defaultValue: false,
                displayName: {
                    defaultText: "Include nested members",
                },
                type: "Checkbox",
                order: 6,
            },
            includeFilteredGroups: {
                disabledExpression: "filterByGroups.length === 0",
                defaultValue: false,
                displayName: {
                    defaultText: "Include filtered groups"
                },
                type: "Checkbox",
                order: 7,
            },
            selfSelectBtn: {
                defaultValue: true,
                disabledExpression: "selectionMode === 'group' || selectionMode === 'groups'",
                displayName: {
                    defaultText: "Enable self-select button",
                },
                type: "Checkbox",
                order: 8,
            },
        },
        metadata: {
            renderAs: ControlType.WebComponent,
            states: {
                readOnly: true,
                hidden: true,
                required: true,
                disabled: true
            },
            iconClass: "userGroupIcon"
        }
    }
};
