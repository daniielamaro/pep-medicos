import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';
@Injectable({
  providedIn: 'root'
})
export class NovoAtendimentoService {

  constructor(private urlService: UrlService) { }

  async getListarPacientes(){
    return await this.urlService.sendRequestPost("/Paciente/GetListarPaciente");
  }
}
