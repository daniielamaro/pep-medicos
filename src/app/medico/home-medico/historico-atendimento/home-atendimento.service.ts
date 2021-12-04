import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable({
  providedIn: 'root'
})
export class HomeAtendimentoService {

  constructor(private urlService: UrlService) { }

  async getListaAtendimentos(id: string){
    return await this.urlService.sendRequestPost("/Medico/GetHistoricoAtendimento");
  }

}
