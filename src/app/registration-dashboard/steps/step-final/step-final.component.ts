import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-step-final',
  templateUrl: './step-final.component.html',
  styleUrls: ['./step-final.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepFinalComponent implements OnInit {

  rectangles = new Array(10).fill(0);
  colors = [
    '#B37356',
    '#B1FF92',
    '#FFB694',
    '#6266CC',
    '#5F62B3',
  ];

  constructor(
    private readonly router: Router,
  ) { }

  getRandomColor() {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }

  ngOnInit() {
    of({})
      .pipe(
        delay(5000),
      ).subscribe(
        () => {
          this.router.navigateByUrl('dashboard');
        }
      );
  }
}
