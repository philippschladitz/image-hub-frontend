import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundImagesComponent } from './background-images.component';
import { MatGridListModule } from '@angular/material/grid-list';

describe('BackgroundImagesComponent', () => {
  let component: BackgroundImagesComponent;
  let fixture: ComponentFixture<BackgroundImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BackgroundImagesComponent],
      imports: [MatGridListModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundImagesComponent);
    component = fixture.componentInstance;
  });

  fit('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  fit('should set the top position', () => {
    component.top = '10px';
    fixture.detectChanges();
    expect(fixture.nativeElement.style.top).toEqual('10px');
  });

  fit('should get the images', () => {
    fixture.detectChanges();
    expect(component.images.length).toBeGreaterThan(0);
    expect(component.images.every(image => image.url.includes('assets/login'))).toBeTruthy();
  });
});
