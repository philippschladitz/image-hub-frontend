import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';

import { StepFinalComponent } from './step-final.component';
import { of } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import { Router } from '@angular/router';

describe('StepFinalComponent', () => {
  let component: StepFinalComponent;
  let fixture: ComponentFixture<StepFinalComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepFinalComponent],
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([
          {
            path: 'dashboard',
            redirectTo: ''
          }
        ]),
        MatIconModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router) as Router;
    spyOn(router, 'navigateByUrl').and.returnValue(true);

    fixture = TestBed.createComponent(StepFinalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fade out first layer and fade in second layer after 2s', done => {
    fixture.detectChanges();
    expect(component.firstLayerFadeOut).toBeFalsy();
    expect(component.secondLayerFadeIn).toBeFalsy();

    of({})
      .pipe(delay(2500))
      .subscribe(() => {
        expect(component.firstLayerFadeOut).toBeTruthy();
        expect(component.secondLayerFadeIn).toBeTruthy();
        done();
      });
  });

  it('should redirect after 5s', done => {
    fixture.detectChanges();
    of({})
      .pipe(delay(5500))
      .subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('dashboard');
        done();
      });
  }, 10000);

  it('should unsubscribe subscriptions on destroy', () => {
    fixture.detectChanges();
    spyOn((component as any).fadeSubscription, 'unsubscribe').and.callThrough();
    spyOn((component as any).redirectSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect((component as any).fadeSubscription.unsubscribe).toHaveBeenCalled();
    expect((component as any).redirectSubscription.unsubscribe).toHaveBeenCalled();
  });
});
