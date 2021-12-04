import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/class/storage.service';
import { UrlService } from 'src/app/shared/class/url-service';
import { NovoAtendimentoService } from './novo-atendimento.service';

@Component({
  selector: 'app-novo-atendimento',
  templateUrl: './novo-atendimento.component.html',
  styleUrls: ['./novo-atendimento.component.scss']
})
export class NovoAtendimentoComponent implements OnInit {
  cpf:string;
  user: any;
  listaCompleta: any;
  dados:any;
  
  constructor(private router: Router, private NovoAtendimentoService: NovoAtendimentoService, private storage: StorageService, private urlService: UrlService) {
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
     (await this.NovoAtendimentoService.getPacienteByCpf(this.cpf)).subscribe((resp: any)=>{
       this.dados = resp
       console.log(this.dados.fotoPerfil.binario)
    });
  }

}
