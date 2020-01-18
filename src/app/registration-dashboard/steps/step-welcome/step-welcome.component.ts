import { Component, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { StepsService } from '../steps.service';
import { APIService } from '@app/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-step-welcome',
  templateUrl: './step-welcome.component.html',
  styleUrls: ['./step-welcome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepWelcomeComponent {
  @Output() next = new EventEmitter();

  bubbles = [
    {
      left: '-88px',
      top: '-12px'
    },
    {
      left: '89px',
      top: '1px'
    },
    {
      left: '-21px',
      top: '-49px'
    },
    {
      left: '-83px',
      top: '-20px'
    },
    {
      left: '-72px',
      top: '30px'
    },
    {
      left: '35px',
      top: '46px'
    },
    {
      left: '89px',
      top: '-2px'
    },
    {
      left: '88px',
      top: '-9px'
    },
    {
      left: '70px',
      top: '30px'
    },
    {
      left: '-71px',
      top: '30px'
    }
  ];

  email = '';
  name = '';
  editName = false;
  nameInputForm: FormGroup;

  get showNameError() {
    return this.nameInputForm.controls.name.invalid && this.nameInputForm.controls.name.dirty;
  }

  constructor(
    private readonly apiService: APIService,
    private readonly stepsService: StepsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    stepsService.getName().subscribe(name => {
      this.name = name;
      this.changeDetectorRef.markForCheck();
    });

    stepsService.getEmail().subscribe(email => {
      this.email = email;
      this.changeDetectorRef.markForCheck();
    });

    this.nameInputForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
    });
  }

  saveName() {
    if (this.nameInputForm.valid) {
      this.stepsService
        .postName({
          name: this.nameInputForm.value.name
        })
        .subscribe(result => {
          this.nameInputForm.setValue({
            name: result
          });
          this.name = result;
          this.editName = false;
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  showEditName() {
    this.editName = true;
    this.nameInputForm.setValue({
      name: this.name
    });
    this.changeDetectorRef.markForCheck();
  }

  onNext() {
    this.next.emit();
  }

  useLogin() {
    this.apiService.clear();
    // angular has a bug where navigateByUrl doesnt support queryParams
    // issue 18798 on angular github
    this.router.navigate(['/auth'], {
      queryParams: {
        login: true
      }
    });
  }
}
