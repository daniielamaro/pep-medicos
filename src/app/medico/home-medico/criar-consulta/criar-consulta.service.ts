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

}
