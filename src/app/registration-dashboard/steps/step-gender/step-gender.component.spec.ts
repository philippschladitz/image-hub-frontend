import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { StepGenderComponent } from './step-gender.component';
import { StepsService } from '../steps.service';

describe('StepGenderComponent', () => {
  let component: StepGenderComponent;
  let fixture: ComponentFixture<StepGenderComponent>;

  beforeEach(async(() => {
    const stepsService = ({
      getAvailableTopics: () =>
        of([
          {
            id: 'id1',
            imageUrl: 'imageUrl1'
          },
          {
            id: 'id2',
            imageUrl: 'imageUrl2'
          },
          {
            id: 'id3',
            imageUrl: 'imageUrl3'
          }
        ]),
      getName: () => of('name'),
      getEmail: () => of('test@email.de'),
      getGender: () =>
        of({
          gender: 'female'
        }),
      getCountryAndLanguage: () =>
        of({
          country: 'Germany',
          language: 'German'
        }),
      getTopics: () => of(['topic1', 'topic2']),
      postCountryAndLanguage: body => of({}),
      postGender: body => of({}),
      postName: body => of({}),
      postTopics: body => of({})
    } as unknown) as StepsService;

    TestBed.configureTestingModule({
      declarations: [StepGenderComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatRadioModule,
        MatDividerModule,
        MatButtonModule
      ],
      providers: [
        {
          provide: StepsService,
          useValue: stepsService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next when gender is male', () => {
    spyOn(component.next, 'emit').and.callThrough();

    component.form.patchValue({
      gender: 'male'
    });
    component.onNext();

    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should call next when gender is female', () => {
    spyOn(component.next, 'emit').and.callThrough();

    component.form.patchValue({
      gender: 'female'
    });
    component.onNext();

    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should call next when gender is user defined', () => {
    spyOn(component.next, 'emit').and.callThrough();

    component.form.patchValue({
      gender: 'userDefined',
      userDefinedGender: 'gender'
    });
    component.onNext();

    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should not call next when gender is not valid', () => {
    spyOn(component.next, 'emit').and.callThrough();

    component.form.patchValue({
      gender: 'not a correct value'
    });
    component.onNext();

    expect(component.next.emit).not.toHaveBeenCalled();
  });

  it('should return true on isGenderUserDefined', () => {
    component.form.patchValue({
      gender: 'userDefined',
      userDefinedGender: 'gender'
    });

    expect(component.isGenderUserDefined()).toBeTruthy();
  });

  it('should return false on isGenderUserDefined for male', () => {
    component.form.patchValue({
      gender: 'male',
      userDefinedGender: 'gender'
    });

    expect(component.isGenderUserDefined()).toBeFalsy();
  });

  it('should return false on isGenderUserDefined for female', () => {
    component.form.patchValue({
      gender: 'female',
      userDefinedGender: 'gender'
    });

    expect(component.isGenderUserDefined()).toBeFalsy();
  });

  it('should require gender in form', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should require user defined gender when gender is userDefined', () => {
    component.form.patchValue({
      gender: 'userDefined'
    });

    expect(component.form.valid).not.toBeTruthy();
  });
});
