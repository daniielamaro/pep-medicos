import { Injectable } from '@angular/core';
import { UrlService } from '../../../shared/class/url-service';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private urlService: UrlService) { }

  async cadastrarMedico(request: any){
    return await this.urlService.sendRequestPost("/Medico/Cadastrar", JSON.stringify(request));
  }

  async cadastrarEnfermeiro(request: any){
    return await this.urlService.sendRequestPost("/Enfermeiro/Cadastrar", JSON.stringify(request));
  }

  async cadastrarAgente(request: any){
    return await this.urlService.sendRequestPost("/AgenteAdm/Cadastrar", JSON.stringify(request));
  }
}
