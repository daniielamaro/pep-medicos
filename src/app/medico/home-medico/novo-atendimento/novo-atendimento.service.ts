import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';
@Injectable({
  providedIn: 'root'
})
export class NovoAtendimentoService {

  constructor(private urlService: UrlService) { }

  async getPacienteByFilter(request:any){
    return await this.urlService.sendRequestPost("/Paciente/GetPacienteByFilter", JSON.stringify(request));
  }
}
