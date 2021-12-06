import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';

@Injectable({
  providedIn: 'root'
})
export class CriarConsultaService {

  constructor(private urlService: UrlService) { }

  async getPacienteById(id: string){
    return await this.urlService.sendRequestPost("/Paciente/GetPacienteById?id="+id);
  }

  async getListaConsulta(){
    return await this.urlService.sendRequestPost("/Consulta/ListaTiposConsultas");
  }

  async cadastroConsulta(request: any){
    return await this.urlService.sendRequestPost("/Consulta/CadastroConsulta", JSON.stringify(request));
  }

  async cadastroMedicamento(request: any){
    return await this.urlService.sendRequestPost("/Medicamento/CadastroLista", JSON.stringify(request));
  }

}
