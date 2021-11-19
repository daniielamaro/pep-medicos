import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/class/storage.service';
import { UrlService } from 'src/app/shared/class/url-service';

@Component({
  selector: 'app-home-administrativo',
  templateUrl: './home-administrativo.component.html',
  styleUrls: ['./home-administrativo.component.scss']
})
export class HomeAdministrativoComponent implements OnInit {

  user: any;

  listaCompleta: any = [
    {id: 1, nome: 'Jacinto Pinto', email: 'jacinto@email.com', funcao: 'Medico'},
    {id: 2, nome: 'Munir Nunes', email: 'munir@email.com', funcao: 'Enfermeiro'},
    {id: 3, nome: 'Daniel Amaro', email: 'daniel@email.com', funcao: 'Agente Administrativo'}
  ];

  nomePesquisa: string;
  tamanhoPagina: number = 10;

  paginaAtual: number = 1;

  paginaBt1: number = 1;
  paginaBt2: number = 1;
  paginaBt3: number = 1;
  paginaBt4: number = 1;
  paginaBt5: number = 1;
  paginaBt6: number = 1;
  paginaBt7: number = 1;

  listaPesquisa: any;
  listaFinal: any;

  constructor(private router: Router, private storage: StorageService, private urlService: UrlService) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd && this.router.url == "/administrativo") {
        this.ngOnInit();
      }
    });
  }

  async ngOnInit() {
    this.user = await this.storage.get("user");
    let token = await this.storage.get("token");
    await this.urlService.validateToken(token);

    this.listaPesquisa = this.listaCompleta;
    this.montarListaFinal(1);
  }

  pesquisar(){
    this.listaPesquisa = this.listaCompleta.filter(item => {
      return item.nome.toUpperCase().includes(this.nomePesquisa.toUpperCase());
    });
    this.montarListaFinal(1);
  }

  montarListaFinal(page: number){
    this.paginaAtual = page;

    this.listaFinal = this.listaPesquisa.slice((this.paginaAtual-1)*this.tamanhoPagina, this.paginaAtual*this.tamanhoPagina);

    this.montarPaginacao();
  }

  montarPaginacao(){
    this.paginaBt1 = 1;
    this.paginaBt7 = Math.ceil(this.listaPesquisa.length / this.tamanhoPagina);

    if(this.paginaAtual < 5){
      this.paginaBt2 = 2;
      this.paginaBt3 = 3;
      this.paginaBt4 = 4;
      this.paginaBt5 = 5;
      this.paginaBt6 = 6;
    }else if(this.paginaAtual >= 5 && this.paginaAtual <= (this.paginaBt7-4) ){
      this.paginaBt2 = this.paginaAtual-2;
      this.paginaBt3 = this.paginaAtual-1;
      this.paginaBt4 = this.paginaAtual;
      this.paginaBt5 = this.paginaAtual+1;
      this.paginaBt6 = this.paginaAtual+2;
    }else{
      this.paginaBt2 = this.paginaBt7-5;
      this.paginaBt3 = this.paginaBt7-4;
      this.paginaBt4 = this.paginaBt7-3;
      this.paginaBt5 = this.paginaBt7-2;
      this.paginaBt6 = this.paginaBt7-1;
    }

  }
}
