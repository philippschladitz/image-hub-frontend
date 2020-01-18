import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { of } from 'rxjs';

import { TopicCardComponent } from '../topic-card/topic-card.component';
import { StepTopicsComponent } from './step-topics.component';
import { StepsService } from '../steps.service';

describe('StepTopicsComponent', () => {
  let component: StepTopicsComponent;
  let fixture: ComponentFixture<StepTopicsComponent>;

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
      declarations: [StepTopicsComponent, TopicCardComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
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
    fixture = TestBed.createComponent(StepTopicsComponent);
    component = fixture.componentInstance;
    component.topics = [
      {
        name: 'topic1',
        imageUrl: 'imageUrl1'
      },
      {
        name: 'topic2',
        imageUrl: 'imageUrl2'
      },
      {
        name: 'topic3',
        imageUrl: 'imageUrl3'
      },
      {
        name: 'topic4',
        imageUrl: 'imageUrl4'
      },
      {
        name: 'topic5',
        imageUrl: 'imageUrl5'
      },
      {
        name: 'topic6',
        imageUrl: 'imageUrl6'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable next button when form valid', () => {
    component.form.patchValue({
      topics: [true, false, true, true, true, true]
    });

    expect(component.isNextEnabled).toBeTruthy();
  });

  it('should disable next button when form invalid', () => {
    component.form.patchValue({
      topics: [false, false, true, true, true, true]
    });

    expect(component.isNextEnabled).toBeFalsy();
  });

  it('should have 5 topics to select in beginning', () => {
    expect(component.topicsToSelect).toEqual(5);
  });

  it('should have 0 topics to select when already 5 selected', () => {
    component.form.patchValue({
      topics: [false, true, true, true, true, true]
    });
    expect(component.topicsToSelect).toEqual(0);
  });

  it('should call next emit when form valid', () => {
    component.form.patchValue({
      topics: [false, true, true, true, true, true]
    });
    spyOn(component.next, 'emit').and.callThrough();
    component.onNext();
    expect(component.next.emit).toHaveBeenCalled();
  });

  it('should not call next emit when form invalid', () => {
    component.form.patchValue({
      topics: [false, false, true, true, true, true]
    });
    spyOn(component.next, 'emit').and.callThrough();
    component.onNext();
    expect(component.next.emit).not.toHaveBeenCalled();
  });

  it('should post the last 5 topics but not the first', () => {
    component.form.patchValue({
      topics: [false, true, true, true, true, true]
    });

    const stepsService = TestBed.get(StepsService) as StepsService;
    spyOn(stepsService, 'postTopics').and.callThrough();
    component.onNext();

    expect(stepsService.postTopics).toHaveBeenCalledWith({
      topics: ['topic2', 'topic3', 'topic4', 'topic5', 'topic6']
    });
  });
});
