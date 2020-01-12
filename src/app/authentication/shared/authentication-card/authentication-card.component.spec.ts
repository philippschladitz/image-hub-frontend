import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationCardComponent } from './authentication-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AuthenticationCardComponent', () => {
  let component: AuthenticationCardComponent;
  let fixture: ComponentFixture<AuthenticationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationCardComponent],
      imports: [NoopAnimationsModule, MatButtonModule, MatCardModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit output event', done => {
    component.buttonClick.subscribe(() => {
      done();
    });

    fixture.debugElement.query(By.css('button')).nativeElement.click();
  });
});
