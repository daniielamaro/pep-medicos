import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from './app.service';
import { Alertas } from './shared/class/alertas';
import { StorageService } from './shared/class/storage.service';
import { UrlService } from './shared/class/url-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: any;

  constructor(
    public router: Router,
    private storage: StorageService,
    private urlService: UrlService,
    private appService: AppService,
    private alertas: Alertas
  ) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  async ngOnInit(){
    this.user = await this.storage.get("user");
  }

  async editarPerfil(){
    let result = await this.alertas.trocarSenha();
    if(result[1] != result[2]){
      this.alertas.erro("As senhas não são iguais!");
      return;
    }
    this.alertas.showLoading("Alterando senha...");
    switch(this.user.esp){
      case "agente": await this.trocarSenhaAgente(result[0], result[1]); break;
      case "medico": await this.trocarSenhaMedico(result[0], result[1]); break;
      case "enfermeiro": await this.trocarSenhaEnfermeiro(result[0], result[1]); break;
    }
  }

  async trocarSenhaAgente(senhaAtual: string, novaSenha: string){
    (await this.appService.trocarSenhaAgente(this.user.id, senhaAtual, novaSenha))
      .subscribe(async (resp: any) => {
        this.alertas.fecharModal();
        this.alertas.sucesso("Senha alterada com sucesso!");
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      })
  }

  async trocarSenhaMedico(senhaAtual: string, novaSenha: string){
    (await this.appService.trocarSenhaMedico(this.user.id, senhaAtual, novaSenha))
      .subscribe(async (resp: any) => {
        this.alertas.fecharModal();
        this.alertas.sucesso("Senha alterada com sucesso!");
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      })
  }

  async trocarSenhaEnfermeiro(senhaAtual: string, novaSenha: string){
    (await this.appService.trocarSenhaEnfermeiro(this.user.id, senhaAtual, novaSenha))
      .subscribe(async (resp: any) => {
        this.alertas.fecharModal();
        this.alertas.sucesso("Senha alterada com sucesso!");
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      })
  }

  sair(){
    this.storage.remove("user");
    this.storage.remove("token");
    this.router.navigateByUrl("login");
  }
}
