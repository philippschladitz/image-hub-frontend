import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedBubbleComponent } from './animated-bubble.component';

describe('AnimatedBubbleComponent', () => {
  let component: AnimatedBubbleComponent;
  let fixture: ComponentFixture<AnimatedBubbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedBubbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
