import { Injectable } from '@angular/core';
import { UrlService } from 'src/app/shared/class/url-service';
@Injectable({
  providedIn: 'root'
})
export class NovoAtendimentoService {

  constructor(private urlService: UrlService) { }

  async getPacienteByCpf(cpf:string){
    return await this.urlService.sendRequestPost("/Paciente/GetPacienteByCpf?Cpf="+cpf);
   
  }
}
