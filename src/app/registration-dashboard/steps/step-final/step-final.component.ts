import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-step-final',
  templateUrl: './step-final.component.html',
  styleUrls: ['./step-final.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFinalComponent implements OnInit, OnDestroy {
  rectangles = new Array(10).fill(0);
  colors = ['#B37356', '#B1FF92', '#FFB694', '#6266CC', '#5F62B3'];
  firstLayerFadeOut = false;
  secondLayerFadeIn = false;

  private fadeSubscription: Subscription;
  private redirectSubscription: Subscription;

  constructor(private readonly router: Router, private readonly changeDetectorRef: ChangeDetectorRef) {}

  getRandomColor() {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

  ngOnInit() {
    this.fadeSubscription = of({})
      .pipe(delay(2000))
      .subscribe(() => {
        this.firstLayerFadeOut = true;
        this.secondLayerFadeIn = true;
        this.changeDetectorRef.markForCheck();
      });

    this.redirectSubscription = of({})
      .pipe(delay(5000))
      .subscribe(() => {
        this.router.navigateByUrl('dashboard');
      });
  }

  ngOnDestroy() {
    this.fadeSubscription.unsubscribe();
    this.redirectSubscription.unsubscribe();
  }
}
