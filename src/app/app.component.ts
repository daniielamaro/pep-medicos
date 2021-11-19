import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './shared/class/storage.service';
import { UrlService } from './shared/class/url-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: any;

  constructor(public router: Router, private storage: StorageService, private urlService: UrlService) {}

  async ngOnInit(){
    this.user = await this.storage.get("user");
  }

  sair(){
    this.storage.remove("user");
    this.storage.remove("token");
    this.router.navigateByUrl("login");
  }
}
