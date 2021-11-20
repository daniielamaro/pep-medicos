import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable({
  providedIn: 'root'
})
export class HomeAdministrativoService {

  constructor(private urlService: UrlService) { }

  async getListaFuncionarios(id: string){
    return await this.urlService.sendRequestPost("/AgenteAdm/GetListaFuncionario?idClinica="+id);
  }

  async deletarFuncionario(id: string){
    return await this.urlService.sendRequestDelete("/AgenteAdm/DeleteAgente?id="+id);
  }

}
