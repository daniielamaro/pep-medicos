import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from '../class/storage.service';
import { RedirectGuard } from './redirect.guard';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoGuard implements CanActivate {

  constructor(private storage: StorageService, private redirectGuard: RedirectGuard) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    let user = await this.storage.get("user");

    if(!user || (user && user.esp != 'agente')){
      this.redirectGuard.redirect();
      return false;
    }

    return true;
  }
}
