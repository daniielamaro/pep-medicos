import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StorageService } from 'src/app/shared/class/storage.service';
import { UrlService } from 'src/app/shared/class/url-service';
import { CadastroService } from './cadastro.service';
@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.scss']
})
export class CadastrarFuncionarioComponent implements OnInit {

  tipoCadastro: number = 0 ;
  nome:string = '';
  email:string = '';
  cpf:string = '';
  corem:string = '';
  crm:string = '';

  editando: boolean = false;

  user: any;

  funcionarioEdit: any;
  funcCadastrado: any;

  constructor(
    private cadastroService: CadastroService,
    private storage: StorageService,
    private actvRouter: ActivatedRoute,
    private urlService: UrlService,
    private router: Router){
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd && this.router.url == "/administrativo/cadastrar-funcionario") {
        this.ngOnInit();
      }
    });
  }

  async ngOnInit() {
    this.funcCadastrado = undefined;
    this.funcionarioEdit = undefined;
    this.user = await this.storage.get("user");
    let token = await this.storage.get("token");
    await this.urlService.validateToken(token);

    this.actvRouter.params.subscribe(async params => {
      let id = params['id'];
      let tipo = params['tipo'];
      if(id){
        this.editando = true;
        switch(tipo){
          case 'medico': this.tipoCadastro = 1; (await this.cadastroService.getMedicoById(id))
                            .subscribe((resp: any) => {
                              this.funcionarioEdit = resp;
                              this.nome = this.funcionarioEdit.nome;
                              this.email = this.funcionarioEdit.email;
                              this.crm = this.funcionarioEdit.crm;
                            }); break;
          case 'enfermeiro': this.tipoCadastro = 2; (await this.cadastroService.getEnfermeiroById(id))
                              .subscribe((resp: any) => {
                                this.funcionarioEdit = resp;
                                this.nome = this.funcionarioEdit.nome;
                                this.email = this.funcionarioEdit.email;
                                this.corem = this.funcionarioEdit.corem;
                              }); break;
          case 'agente': this.tipoCadastro = 3; (await this.cadastroService.getAgenteById(id))
                          .subscribe((resp: any) => {
                            this.funcionarioEdit = resp;
                            this.nome = this.funcionarioEdit.nome;
                            this.email = this.funcionarioEdit.email;
                            this.cpf = this.funcionarioEdit.cpf;
                          }); break;
        }
      }
    });
  }

  async cadastrar() {
    switch(Number(this.tipoCadastro)){
      case 1: await this.cadastrarMedico(); break;
      case 2: await this.cadastrarEnfermeiro(); break;
      case 3: await this.cadastrarAgente(); break;
    }
  }

  async cadastrarMedico(){
    let request = {
      nome: this.nome,
      crm: this.crm,
      email: this.email,
      idClinica: this.user.clinica.id
    };

    (await this.cadastroService.cadastrarMedico(request))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
      })
  }

  async cadastrarEnfermeiro(){
    let request = {
      nome: this.nome,
      corem: this.corem,
      email: this.email,
      idClinica: this.user.clinica.id
    };

    (await this.cadastroService.cadastrarEnfermeiro(request))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
      })
  }

  async cadastrarAgente(){
    let request = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      idClinica: this.user.clinica.id
    };

    (await this.cadastroService.cadastrarAgente(request))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
      })
  }

}
