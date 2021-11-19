import { Component, OnInit } from '@angular/core';
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

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.tipoDeAcesso = 1;
  }

  async entrar(){
    switch(this.tipoDeAcesso){
      case 1: await this.entrarMedico(); break;
      case 2: await this.entrarEnfermeiro(); break;
      case 3: await this.entrarAgente(); break;
    }
  }

  async entrarMedico(){
    (await this.loginService.entrarMedico(this.usuario, this.senha))
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }

  async entrarEnfermeiro(){
    (await this.loginService.entrarEnfermeiro(this.usuario, this.senha))
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }

  async entrarAgente(){
    (await this.loginService.entrarAgente(this.usuario, this.senha))
      .subscribe((resp: any) => {
        console.log(resp);
      });
  }

}
