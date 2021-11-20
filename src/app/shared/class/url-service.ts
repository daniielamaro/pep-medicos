import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class UrlService {

  static BACKEND_URL = 'http://localhost:54439';
 // static BACKEND_URL = 'http://34.68.18.75:8080';

  constructor(private storage: StorageService, private router: Router, private http: HttpClient) {}

  async validateToken(token: string){
    (await this.sendRequestPost("/Usuario/VerificarToken?token="+token))
      .subscribe(() => {},
      error => {
        if(error.status == 400 || error.status == 401 || error.status == 403){
          this.storage.remove("user");
          this.router.navigateByUrl("");
        }
      })
  }

  async sendRequestPost(url: string, body: string = ""){

    let token = await this.storage.get("token");

    return this.http.post(UrlService.BACKEND_URL+url, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'BEARER ' + token)
    });

  }

  async sendRequestPostCustom(url: string){

    return this.http.post(url, "");

  }
}
