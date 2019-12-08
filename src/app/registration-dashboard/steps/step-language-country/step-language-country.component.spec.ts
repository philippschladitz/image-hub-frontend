import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepLanguageCountryComponent } from './step-language-country.component';

describe('StepLanguageCountryComponent', () => {
  let component: StepLanguageCountryComponent;
  let fixture: ComponentFixture<StepLanguageCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepLanguageCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepLanguageCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
