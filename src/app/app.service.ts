import { Injectable } from '@angular/core';
import { UrlService } from './shared/class/url-service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private urlService: UrlService) { }

  async trocarSenhaAgente(id: string, senhaAtual: string, novaSenha: string){
    return await this.urlService.sendRequestPost("/AgenteAdm/TrocarSenha?id="+id+"&senhaAtual="+senhaAtual+"&novaSenha="+novaSenha);
  }

  async trocarSenhaMedico(id: string, senhaAtual: string, novaSenha: string){
    return await this.urlService.sendRequestPost("/Medico/TrocarSenha?id="+id+"&senhaAtual="+senhaAtual+"&novaSenha="+novaSenha);
  }

  async trocarSenhaEnfermeiro(id: string, senhaAtual: string, novaSenha: string){
    return await this.urlService.sendRequestPost("/Enfermeiro/TrocarSenha?id="+id+"&senhaAtual="+senhaAtual+"&novaSenha="+novaSenha);
  }

}
