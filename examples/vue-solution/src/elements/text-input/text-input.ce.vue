<template>
  <label class="labelled-control" :key="props.childNode?.id + '-' + updateKey.value">
    <div class="control-label-container">
      <span
        class="sas-form-label"
        :class="{
          required: !!props.controlApi.control?.state?.required,
          disabled: !!props.controlApi.control?.state?.disabled
        }"
      >{{ props.childNode.typeAttributes?.title?.text }}</span>
    </div>
  
    <span v-if="props.pageModel.mode === PageMode.View" role="text">{{ model.fieldValue }}</span>

    <textarea
      v-else
      type="text"
      class="sas-form-element"
      placeholder="Example Vue Input"
      :class="{
        'designer-readonly': props.pageModel.mode === PageMode.Design && !!props.controlApi.control?.state.readOnly,
        'vuejs-input': props.childNode.typeAttributes.vueBorder,
        'disabled-input': props.controlApi.control?.state.disabled
      }"
      :value="model.fieldValue"
      :rows="props.childNode.typeAttributes?.multiLine ? 5 : 1"
      :aria-multiline="!!props.childNode.typeAttributes?.multiLine"
      :required="props.controlApi.control?.state.required"
      :readOnly="props.controlApi.control?.state.readOnly"
      :disabled="props.controlApi.control?.state.disabled || props.pageModel.mode === PageMode.Design"
      @input="handleInputChange"
    ></textarea>
  </label>
</template>

<script setup lang="ts">
import { onMounted, defineProps, reactive, getCurrentInstance } from 'vue'
import { PageMode } from '@sassoftware/vi-api/page-model/page-model-api'
import type { PageModel } from '@sassoftware/vi-api/page-model/page-model-api'
import type { Control } from '@sassoftware/vi-api/control/page'
import type { ControlMemberApi } from '@sassoftware/vi-api/control/control-api'
import type { FileRestrictions, FieldRestrictions } from '@sassoftware/vi-api/control/restrictions'

interface SolutionExtensionProps {
  childNode: Control,
  controlApi: ControlMemberApi
  pageModel: PageModel
  restrictions?: FileRestrictions | FieldRestrictions
}

function useForceUpdate() {
  const instance = getCurrentInstance()
  return () => instance?.proxy?.$forceUpdate()
}

const props = defineProps<SolutionExtensionProps>()
const model = reactive({ fieldValue: ""});
const updateKey = reactive({ value: 0 });
const forceUpdate = useForceUpdate()

onMounted(() => {
  // Set component fieldValue to the control fieldValue
  model.fieldValue = (props.controlApi?.control?.getFieldValue?.() ?? '') as string

  // Subscribe to the page and control onChange events
  props.controlApi.page?.onChange(() => handlePageChangeEvent());
  props.controlApi.page?.onPropertyChange(() => forceUpdate());
  props.controlApi.control.state.onChange(() => forceUpdate());

  forceUpdate();
})

// If a new value has been entered into the input, update the control's fieldValue
function handleInputChange(event: any) {
  props.controlApi?.control?.setFieldValue?.(event.target?.value);
};

// If the control's fieldValue has changed update the component's fieldValue state
function handlePageChangeEvent() {
  const fieldValue  = props.controlApi?.control?.getFieldValue?.()
  
  if (model.fieldValue !== fieldValue) {
    model.fieldValue = fieldValue as string;
  }

  forceUpdate();
}
</script>

<style scoped lang="scss">
label {
    display: block;
    .disabled {
        color: var(--standard-disabled-fg);
    }
}

textarea {
  &[rows="1"] {
      resize: none;
  }

  &:disabled {
    pointer-events: none;

    &:active {
      border-color: var(--input-disabled-bd) !important;
    }
  }

  &.designer-readonly {
    opacity: var(--input-disabled-opacity) !important;
    border: 1px dashed var(--input-disabled-bd) !important;
    padding: 2px .5rem !important;
  }

  &.vuejs-input {
    border-color: #42b883 !important;
  }

  &.required-input {
    border-color: var(--alert-normal-bd);
    color: var(--alert-normal-fg);
    background-color: var(--alert-normal-bg);
  }

  &.disabled-input {
    color: var(--input-disabled-fg);
    opacity: var(--input-disabled-opacity);
    padding: 2px .5rem;
    border: 1px solid var(--input-disabled-bd);
  }
}
</style>
