import { Injectable } from '@angular/core';
import { UrlService } from '../shared/class/url-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private urlService: UrlService) { }

  async entrarMedico(usuario: string, senha: string){
    return await this.urlService.sendRequestPost("/Medico/AcessarSistema?usuario="+usuario+"&senha="+senha);
  }

  async entrarEnfermeiro(usuario: string, senha: string){
    return await this.urlService.sendRequestPost("/Enfermeiro/AcessarSistema?usuario="+usuario+"&senha="+senha);
  }

  async entrarAgente(usuario: string, senha: string){
    return await this.urlService.sendRequestPost("/AgenteAdm/AcessarSistema?usuario="+usuario+"&senha="+senha);
  }

}
