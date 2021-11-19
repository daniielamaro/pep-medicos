import { Component, OnInit } from '@angular/core';
import { CadastroService } from './cadastro.service';
@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent implements OnInit {
  tipoCadastro:number = 0 ;
  nome:string = '';
  email:string = '';
  cpf:string = '';
  corem:string = '';
  crm:string = '';
  


  ngOnInit(): void {
  }

  cadastrarFuncionario(): void {
    if(this.tipoCadastro == 1){
        
    }
    if(this.tipoCadastro == 2){

    }
    if(this.tipoCadastro == 3){

    }
  }
  
}
