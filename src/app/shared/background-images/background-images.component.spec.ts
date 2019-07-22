import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundImagesComponent } from './background-images.component';

describe('BackgroundImagesComponent', () => {
  let component: BackgroundImagesComponent;
  let fixture: ComponentFixture<BackgroundImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
