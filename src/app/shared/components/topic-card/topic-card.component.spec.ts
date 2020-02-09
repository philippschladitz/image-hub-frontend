import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { TopicCardComponent } from './topic-card.component';

describe('TopicCardComponent', () => {
  let component: TopicCardComponent;
  let fixture: ComponentFixture<TopicCardComponent>;
  const functions = {
    onChange: () => {},
    onTouch: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicCardComponent],
      imports: [MatIconModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicCardComponent);
    component = fixture.componentInstance;
    component.topicName = 'topicName';
    component.imageUrl = 'imageUrl';

    spyOn(functions, 'onChange').and.callThrough();
    spyOn(functions, 'onTouch').and.callThrough();

    component.registerOnChange(functions.onChange);
    component.registerOnTouched(functions.onTouch);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show topic name', () => {
    const topicNameDiv = fixture.debugElement.query(By.css('.topic-name')).nativeElement as HTMLDivElement;
    expect(topicNameDiv.innerText).toEqual('topicName');
  });

  it('should show image', () => {
    const image = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    expect(image.src.includes('imageUrl')).toBeTruthy();
  });

  it('should check on click', () => {
    const topicCardElement = fixture.nativeElement as HTMLElement;
    expect(component.checked).toBeFalsy();
    topicCardElement.click();
    expect(component.checked).toBeTruthy();
  });

  it('should uncheck on two clicks', () => {
    const topicCardElement = fixture.nativeElement as HTMLElement;
    expect(component.checked).toBeFalsy();
    topicCardElement.click();
    expect(component.checked).toBeTruthy();
    topicCardElement.click();
    expect(component.checked).toBeFalsy();
  });

  it('should call on touch', () => {
    const topicCardElement = fixture.nativeElement as HTMLElement;
    expect(functions.onTouch).not.toHaveBeenCalled();
    topicCardElement.click();
    expect(functions.onTouch).toHaveBeenCalled();
  });

  it('should call on change', () => {
    const topicCardElement = fixture.nativeElement as HTMLElement;
    expect(functions.onChange).not.toHaveBeenCalled();
    topicCardElement.click();
    expect(functions.onChange).toHaveBeenCalled();
  });
});
