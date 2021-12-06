import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Alertas } from 'src/app/shared/class/alertas';
import { StorageService } from 'src/app/shared/class/storage.service';
import { UrlService } from 'src/app/shared/class/url-service';
import { NovoAtendimentoService } from './novo-atendimento.service';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.component.scss']
})
export class NovoAtendimentoComponent implements OnInit {
  nome: string;
  cpf:string;
  user: any;
  listaCompleta: any;
  dados:any;

  constructor(
    private router: Router,
    private alerts: Alertas,
    private NovoAtendimentoService: NovoAtendimentoService,
    private storage: StorageService,
    private urlService: UrlService
  ) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd && this.router.url == "/novo-atendimento") {
        this.ngOnInit();
      }
    });
  }

  async ngOnInit() {
    this.user = await this.storage.get("user");
    let token = await this.storage.get("token");
    await this.urlService.validateToken(token);
  }

  async pesquisar(){
    this.alerts.showLoading("Procurando paciente...");

    let request = {
      nome: this.nome,
      cpf: this.cpf
    };

    (await this.NovoAtendimentoService.getPacienteByFilter(request))
      .subscribe((resp: any)=>{
        this.alerts.fecharModal();
        this.dados = resp;
      },error => {
        this.alerts.fecharModal();
        this.alerts.erro(error.error);
      });
  }

}
