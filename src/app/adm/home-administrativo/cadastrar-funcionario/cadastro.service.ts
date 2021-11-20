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

  async getMedicoById(id: string){
    return await this.urlService.sendRequestPost("/Medico/GetMedicoById?id="+id);
  }

  async getEnfermeiroById(id: string){
    return await this.urlService.sendRequestPost("/Enfermeiro/GetEnfermeiroById?id="+id);
  }

  async getAgenteById(id: string){
    return await this.urlService.sendRequestPost("/AgenteAdm/GetAgenteById?id="+id);
  }

  async resetarSenhaEnfermeiro(id: string){
    return await this.urlService.sendRequestPost("/Enfermeiro/ResetSenha?id="+id);
  }

  async resetarSenhaMedico(id: string){
    return await this.urlService.sendRequestPost("/Medico/ResetSenha?id="+id);
  }

  async resetarSenhaAgente(id: string){
    return await this.urlService.sendRequestPost("/AgenteAdm/ResetSenha?id="+id);
  }

  async updateEnfermeiro(request: any){
    return await this.urlService.sendRequestPost("/Enfermeiro/Update", JSON.stringify(request));
  }

  async updateMedico(request: any){
    return await this.urlService.sendRequestPost("/Medico/Update", JSON.stringify(request));
  }

  async updateAgente(request: any){
    return await this.urlService.sendRequestPost("/AgenteAdm/Update", JSON.stringify(request));
  }
}
