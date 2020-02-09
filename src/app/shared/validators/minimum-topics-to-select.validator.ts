import { ValidatorFn, FormGroup, ValidationErrors, FormArray } from '@angular/forms';

export const minimumTopicsToSelectValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const formArray = group.get('topics') as FormArray;
  return formArray.controls.filter(control => control.value).length >= 5
    ? null
    : {
        minimumTopicsToSelect: true
      };
};
