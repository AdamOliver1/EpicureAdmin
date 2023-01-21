export class FieldBase<T> {
  value: T|undefined;
  key: string;
  label: string;
  required: boolean;
  maxNumber?: number;
  minNumber?: number;
  order: number;
  controlType: string;
  type: string;
  isFormGroup:boolean;
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      maxNumber?: number;
      minNumber?: number;
      isFormGroup?:boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.maxNumber = options.maxNumber ;
    this.minNumber = options.minNumber;
    this.isFormGroup = options.isFormGroup || false;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}