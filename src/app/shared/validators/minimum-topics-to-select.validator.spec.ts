import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { minimumTopicsToSelectValidator } from './minimum-topics-to-select.validator';

describe('minimumTopicsToSelectValidator', () => {
  let form: FormGroup;

  beforeEach(() => {
    const formBuilder = new FormBuilder();
    form = formBuilder.group(
      {
        topics: formBuilder.array([
          formBuilder.control(true),
          formBuilder.control(true),
          formBuilder.control(true),
          formBuilder.control(true),
          formBuilder.control(true)
        ])
      },
      {
        validators: [minimumTopicsToSelectValidator]
      }
    );
  });

  it('should validate and return null if more or equal to 5 topics selected', () => {
    expect(form.valid).toBeTruthy();
    expect(form.errors).toBeNull();
  });

  it('should validate and return error if less than 5 topics are selected', () => {
    const topicArray = form.get('topics') as FormArray;
    topicArray.at(1).setValue(false);
    expect(form.valid).toBeFalsy();
    expect(form.errors.minimumTopicsToSelect).toBeTruthy();
  });
});
