import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoAtendimentoService {

  constructor(private urlService: UrlService) { }

  async getListaAtendimentosMedico(){
    return await this.urlService.sendRequestPost("/Medico/GetHistoricoAtendimento");
  }

  async getListaAtendimentosEnfermeiro(){
    return await this.urlService.sendRequestPost("/Enfermeiro/GetHistoricoAtendimento");
  }

}
