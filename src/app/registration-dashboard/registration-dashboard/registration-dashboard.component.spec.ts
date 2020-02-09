import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { SharedModule, StepsService } from '@app/shared';

import { RegistrationDashboardComponent } from './registration-dashboard.component';
import { AnimatedBubbleComponent } from '../animated-bubble/animated-bubble.component';
import { StepperComponent } from '../stepper/stepper.component';
import { StepWelcomeComponent, StepGenderComponent, StepLanguageCountryComponent } from '../steps';

describe('RegistrationDashboardComponent', () => {
  let component: RegistrationDashboardComponent;
  let fixture: ComponentFixture<RegistrationDashboardComponent>;

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
      declarations: [
        RegistrationDashboardComponent,
        AnimatedBubbleComponent,
        StepperComponent,
        StepWelcomeComponent,
        StepGenderComponent,
        StepLanguageCountryComponent,
      ],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatRadioModule,
        MatProgressBarModule,
        MatSelectModule,
        RouterTestingModule,
        SharedModule
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
    fixture = TestBed.createComponent(RegistrationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive all available topics to select on init', () => {
    expect(component.topics).toEqual([
      {
        name: 'id1',
        imageUrl: 'imageUrl1'
      },
      {
        name: 'id2',
        imageUrl: 'imageUrl2'
      },
      {
        name: 'id3',
        imageUrl: 'imageUrl3'
      }
    ]);
  });

  it('should show welcome step', () => {
    expect(fixture.debugElement.query(By.css('app-step-welcome'))).toBeDefined();
  });

  it('should show gender step', () => {
    component.next();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-step-gender'))).toBeDefined();
  });

  it('should show language/country step', () => {
    for (let i = 0; i < 2; i++) {
      component.next();
    }
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-step-language-country'))).toBeDefined();
  });

  it('should show topics step', () => {
    for (let i = 0; i < 3; i++) {
      component.next();
    }
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-step-topics'))).toBeDefined();
  });

  it('should show final step', () => {
    for (let i = 0; i < 4; i++) {
      component.next();
    }
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-step-final'))).toBeDefined();
  });

  it('should activate the progressbar on step 4', () => {
    for (let i = 0; i < 4; i++) {
      component.next();
    }
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('mat-progress-bar'))).toBeDefined();
    expect(component.step).toEqual(4);
  });
});
