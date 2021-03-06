import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alertas } from '../shared/class/alertas';
import { StorageService } from '../shared/class/storage.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tipoDeAcesso: number;

  usuario: string;
  senha: string;

  constructor(private loginService: LoginService, private alertas: Alertas, private router: Router, private storage: StorageService) {
  }

  ngOnInit() {
    this.tipoDeAcesso = 1;
  }

  async entrar(){
    this.alertas.showLoading("Verificando usuario...");
    switch(this.tipoDeAcesso){
      case 1: await this.entrarMedico(); break;
      case 2: await this.entrarEnfermeiro(); break;
      case 3: await this.entrarAgente(); break;
    }
  }

  async entrarMedico(){
    (await this.loginService.entrarMedico(this.usuario, this.senha))
      .subscribe(async (resp: any) => {
        this.alertas.fecharModal();
        let user = resp.medico;
        user["esp"] = "medico";
        await this.storage.set("token", resp.token);
        await this.storage.set("user", user);
        this.usuario = undefined;
        this.senha = undefined;

        this.router.navigateByUrl('medico');
      },
      error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async entrarEnfermeiro(){
    (await this.loginService.entrarEnfermeiro(this.usuario, this.senha))
      .subscribe(async (resp: any) => {
        this.alertas.fecharModal();
        let user = resp.enfermeiro;
        user["esp"] = "enfermeiro";
        await this.storage.set("token", resp.token);
        await this.storage.set("user", user);
        this.usuario = undefined;
        this.senha = undefined;

        this.router.navigateByUrl('medico');
      },
      error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async entrarAgente(){
    (await this.loginService.entrarAgente(this.usuario, this.senha))
      .subscribe(async (resp: any) => {
        this.alertas.fecharModal();
        let user = resp.agente;
        user["esp"] = "agente";
        await this.storage.set("token", resp.token);
        await this.storage.set("user", user);
        this.usuario = undefined;
        this.senha = undefined;

        this.router.navigateByUrl('administrativo');
      },
      error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

}
