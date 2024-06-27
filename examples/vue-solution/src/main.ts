
import { defineCustomElement } from 'vue'
import { control } from './elements/text-input/text-input.control'
import TextInputComponent from './elements/text-input/text-input.ce.vue'
import { SviWindow } from '@sassoftware/vi-api';

// Styles provided in compoennts prepended with .ce.vue are converted to inline
// See: https://vuejs.org/guide/extras/web-components.html#sfc-as-custom-element

try {
    const element = defineCustomElement(TextInputComponent);
    customElements.define(control.directiveName!, element);
    (window as SviWindow).sas?.vi?.config?.registerSolutionExtension?.(control);
} catch (err) {
    console.error("Failed to register solution extension", err);
}
