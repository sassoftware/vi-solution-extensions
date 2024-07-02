import { FieldType, FieldValue, NumberDataType } from "@sassoftware/vi-api/control";

/**
 * Takes the value from the event and applies it to the page, ensuring the value is in the correct type for the field.
 * @param event The input event.
 * @returns The input value as a string.
 */
export const onInput = (eventTarget: EventTarget | null) => {
    return (eventTarget as HTMLInputElement).value.toString();
};

/**
 * Handles the paste event. Ensures that newlines and carriage-returns are stripped if we're single-line.
 * @param event Browser clipboard event.
 * @param isMultiLine Boolean value of whether the control is multi line.
 */
export const handlePaste = (event: ClipboardEvent, isMultiLine: boolean) => {
    if (!isMultiLine) {
        const pastedText = event.clipboardData?.getData("text/plain").replace(/([\r\n])/gm, " ");
        if (pastedText != null) {
            document.execCommand("insertText", false, pastedText);
        }
        event.preventDefault();
    }
};

/**
 * Handles the Enter keypress event. Ensures that enter key does nothing if we're single-line.
 * @param event Browser keyboard event for "Enter" keypress.
 * @param isMultiLine Boolean value of whether the control is multi line.
 */
export const handleEnter = (event: Event, isMultiLine: boolean) => {
    if (!isMultiLine) {
        event.preventDefault();
    }
};

/**
 * Gets the default value for the control, stripping CR/LFs if this isn't a multi-line control.
 * @param fieldDataType Data type of field.
 * @param defaultValue Default value of control.
 * @param isMultiLine Boolean value of whether the control is multi line.
 * @return the default value for the control.
 */
export const getDefaultValue = (
    fieldDataType: FieldType | undefined,
    defaultValue: FieldValue | undefined,
    isMultiLine: boolean
) => {
    const numericDataTypes: NumberDataType[] = ["SMALLINT", "INTEGER", "LONG", "FLOAT", "DOUBLE", "NUMERIC"];
    if (typeof defaultValue === "string") {
        if (defaultValue && !isMultiLine) {
            /**
             * Checks to see if the field data type is a numeric value and converts it to a floating number.
             * If it is the value is parsed from a string to a floating value to avoid errors when saving if default values are kept.
             */
            if (numericDataTypes.includes(fieldDataType as NumberDataType)) {
                defaultValue = parseFloat(defaultValue);
            } else {
                defaultValue = defaultValue.replace(/([\r\n])/gm, "");
            }
        }
    }
    return defaultValue as FieldType;
};
