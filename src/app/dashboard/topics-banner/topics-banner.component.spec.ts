import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsBannerComponent } from './topics-banner.component';

describe('TopicsBannerComponent', () => {
  let component: TopicsBannerComponent;
  let fixture: ComponentFixture<TopicsBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
