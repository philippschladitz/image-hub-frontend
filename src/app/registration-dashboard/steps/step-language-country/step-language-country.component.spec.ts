import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { of } from 'rxjs';

import { StepsService } from '../../../shared';
import { StepLanguageCountryComponent } from './step-language-country.component';

describe('StepLanguageCountryComponent', () => {
  let component: StepLanguageCountryComponent;
  let fixture: ComponentFixture<StepLanguageCountryComponent>;

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
      declarations: [StepLanguageCountryComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
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
    fixture = TestBed.createComponent(StepLanguageCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require language', () => {
    component.form.patchValue({
      language: ''
    });
    expect(component.form.get('language').errors.required).toBeTruthy();
    expect(component.form.valid).toBeFalsy();
  });

  it('should require country', () => {
    component.form.patchValue({
      country: ''
    });
    expect(component.form.get('country').errors.required).toBeTruthy();
    expect(component.form.valid).toBeFalsy();
  });

  it('should enable next button on form valid', () => {
    component.form.patchValue({
      language: 'german',
      country: 'germany'
    });
    expect(component.form.valid).toBeTruthy();
    expect(component.isNextEnabled).toBeTruthy();
  });

  it('should disable next button on form invalid', () => {
    component.form.patchValue({
      language: '',
      country: ''
    });
    expect(component.form.valid).toBeFalsy();
    expect(component.isNextEnabled).toBeFalsy();
  });

  it('should emit next on onNext', () => {
    component.form.patchValue({
      language: 'german',
      country: 'germany'
    });
    spyOn(component.next, 'emit').and.callThrough();
    component.onNext();
    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should not emit next on onNext when form invalid', () => {
    component.form.patchValue({
      language: '',
      country: ''
    });
    spyOn(component.next, 'emit').and.callThrough();
    component.onNext();
    expect(component.next.emit).not.toHaveBeenCalled();
  });
});
