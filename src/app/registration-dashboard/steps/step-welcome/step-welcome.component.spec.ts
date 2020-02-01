import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { APIService } from '@app/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { AnimatedBubbleComponent } from '@app/registration-dashboard/animated-bubble/animated-bubble.component';
import { StepsService } from '../../../shared';
import { StepWelcomeComponent } from './step-welcome.component';

describe('StepWelcomeComponent', () => {
  let component: StepWelcomeComponent;
  let fixture: ComponentFixture<StepWelcomeComponent>;

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
      postName: body => of(body.name),
      postTopics: body => of({})
    } as unknown) as StepsService;

    TestBed.configureTestingModule({
      declarations: [StepWelcomeComponent, AnimatedBubbleComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule
      ],
      providers: [
        {
          provide: StepsService,
          useValue: stepsService
        },
        {
          provide: APIService,
          useValue: {
            clear: () => {}
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name after init', () => {
    expect(component.name).toEqual('name');
  });

  it('should have email after init', () => {
    expect(component.email).toEqual('test@email.de');
  });

  it('should have name required error', () => {
    expect(component.nameInputForm.get('name').errors.required).toBeTruthy();
  });

  it('should have name min length of 2 error', () => {
    component.nameInputForm.patchValue({
      name: 'a'
    });
    expect(component.nameInputForm.get('name').errors.minlength).toBeTruthy();
  });

  it('should not have name min length of 2 error', () => {
    component.nameInputForm.patchValue({
      name: 'ab'
    });
    expect(component.nameInputForm.get('name').errors).toBeNull();
  });

  it('should save the name', () => {
    component.showEditName();

    expect(component.name).toEqual('name');
    expect(component.nameInputForm.value.name).toEqual('name');
    expect(component.editName).toBeTruthy();

    component.nameInputForm.patchValue({
      name: 'testName'
    });

    component.saveName();

    expect(component.name).toEqual('testName');
    expect(component.editName).toBeFalsy();
  });

  it('should go next', () => {
    spyOn(component.next, 'emit').and.callThrough();
    component.onNext();
    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should route to login and clear loggedIn data', () => {
    const apiService = TestBed.get(APIService) as APIService;
    const router = TestBed.get(Router) as Router;

    spyOn(apiService, 'clear').and.callThrough();
    spyOn(router, 'navigate').and.returnValue({});

    component.useLogin();

    expect(apiService.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/auth'], {
      queryParams: {
        login: true
      }
    });
  });
});
