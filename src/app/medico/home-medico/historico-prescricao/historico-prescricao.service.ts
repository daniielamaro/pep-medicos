import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoPrescricaoService {

  constructor(private urlService: UrlService) { }

  async getListaPrescricaoMedico(){
    return await this.urlService.sendRequestPost("/Medico/GetHistoricoPrescricoes");
  }

  async getListaPrescricaoEnfermeiro(){
    return await this.urlService.sendRequestPost("/Enfermeiro/GetHistoricoPrescricoes");
  }

}
