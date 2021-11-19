import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { StorageService } from '../class/storage.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard  {

  constructor(private storage: StorageService, private router: Router) { }

  async redirect() {
    let user = await this.storage.get("user");

    switch(user.esp){
      case "medico": this.router.navigateByUrl("medico"); break;
      case "enfermeiro": this.router.navigateByUrl("medico"); break;
      case "agente": this.router.navigateByUrl("administrativo"); break;
      default: this.router.navigateByUrl("login"); break;
    }
  }

}
