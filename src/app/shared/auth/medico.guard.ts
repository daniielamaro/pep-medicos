import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../class/storage.service';
import { RedirectGuard } from './redirect.guard';

@Injectable({
  providedIn: 'root'
})
export class MedicoGuard implements CanActivate {

  constructor(private storage: StorageService, private redirectGuard: RedirectGuard) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    let user = await this.storage.get("user");

    if(!user) return false;
    else if(user.esp != 'medico' && user.esp != 'enfermeiro'){
      this.redirectGuard.redirect();
      return false;
    }

    return true;

  }
}
