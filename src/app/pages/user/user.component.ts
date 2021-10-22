import { Component, OnInit } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { data } from 'jquery';
import {ConsultarCepService} from '../servicos/consultar-cep.service';
@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
 
    cep:string ="";
    cidade:string = "";
    estado:string = "";
    logradouro:string = "";

    constructor(private consultaCep : ConsultarCepService ) {}

    ngOnInit(){
    }
    consultarCep(cep:string){    
        console.log(cep)
            this.consultaCep.buscarCep(cep).subscribe(data =>{
            console.log(data);
            this.cidade = data.localidade
            this.estado = data.uf
            this.logradouro = data.logradouro
            if(data.erro == true){
                this.cidade = ""
                this.estado = ""
                this.logradouro = ""
            }
        }, err=>{
            this.cidade = ""
            this.estado = ""
            this.logradouro = ""
            console.log("Erro ao encontrar o CEP" + err)
        })
      
    
    }
}
