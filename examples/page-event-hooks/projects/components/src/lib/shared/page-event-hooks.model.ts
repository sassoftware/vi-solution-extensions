export interface pageEventHooksAttributes {
  title?: {
    text: string;
  };
  inputWidthCSSClass?: string;
  dataSource: string;
  showSuccess?: boolean;
  showFail?: boolean;
  addRequiredPrefix?: boolean;
  requiredPrefix?: string;
  addText?: boolean;
  prefix?: string;
}
