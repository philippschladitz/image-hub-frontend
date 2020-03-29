import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Pin } from './pin';
import { PinService } from './pin.service';

@Injectable()
export class PinResolver implements Resolve<Pin> {
  constructor(private readonly pinService: PinService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.pinService.getPin(route.paramMap.get('id'));
  }
}
