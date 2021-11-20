import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Alertas } from 'src/app/shared/class/alertas';
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
  id: string;

  funcionarioEdit: any;
  funcCadastrado: any;

  constructor(
    private cadastroService: CadastroService,
    private storage: StorageService,
    private actvRouter: ActivatedRoute,
    private alertas: Alertas,
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
      this.id = params['id'];
      let tipo = params['tipo'];
      if(this.id){
        this.editando = true;
        switch(tipo){
          case 'medico': this.tipoCadastro = 1; (await this.cadastroService.getMedicoById(this.id))
                            .subscribe((resp: any) => {
                              this.funcionarioEdit = resp;
                              this.nome = this.funcionarioEdit.nome;
                              this.email = this.funcionarioEdit.email;
                              this.crm = this.funcionarioEdit.crm;
                            }); break;
          case 'enfermeiro': this.tipoCadastro = 2; (await this.cadastroService.getEnfermeiroById(this.id))
                              .subscribe((resp: any) => {
                                this.funcionarioEdit = resp;
                                this.nome = this.funcionarioEdit.nome;
                                this.email = this.funcionarioEdit.email;
                                this.corem = this.funcionarioEdit.corem;
                              }); break;
          case 'agente': this.tipoCadastro = 3; (await this.cadastroService.getAgenteById(this.id))
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
    this.alertas.showLoading("Cadastrando médico(a)...");
    let request = {
      nome: this.nome,
      crm: this.crm,
      email: this.email,
      idClinica: this.user.clinica.id
    };

    (await this.cadastroService.cadastrarMedico(request))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
        this.alertas.fecharModal();
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async cadastrarEnfermeiro(){
    this.alertas.showLoading("Cadastrando enfermeiro(a)...");
    let request = {
      nome: this.nome,
      corem: this.corem,
      email: this.email,
      idClinica: this.user.clinica.id
    };

    (await this.cadastroService.cadastrarEnfermeiro(request))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
        this.alertas.fecharModal();
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async cadastrarAgente(){
    this.alertas.showLoading("Cadastrando agente administrativo...");
    let request = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      idClinica: this.user.clinica.id
    };

    (await this.cadastroService.cadastrarAgente(request))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
        this.alertas.fecharModal();
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async resetarSenha(){
    this.funcionarioEdit = undefined;
    switch(Number(this.tipoCadastro)){
      case 1: await this.resetarSenhaMedico(this.id); break;
      case 2: await this.resetarSenhaEnfermeiro(this.id); break;
      case 3: await this.resetarSenhaAgente(this.id); break;
    }
  }

  async resetarSenhaMedico(id: string){
    this.alertas.showLoading("Resetando senha...");
    (await this.cadastroService.resetarSenhaMedico(id))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
        this.alertas.fecharModal();
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async resetarSenhaEnfermeiro(id: string){
    this.alertas.showLoading("Resetando senha...");
    (await this.cadastroService.resetarSenhaEnfermeiro(id))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
        this.alertas.fecharModal();
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async resetarSenhaAgente(id: string){
    this.alertas.showLoading("Resetando senha...");
    (await this.cadastroService.resetarSenhaAgente(id))
      .subscribe((resp: any) =>{
        this.funcCadastrado = resp;
        this.alertas.fecharModal();
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async alterar() {
    switch(Number(this.tipoCadastro)){
      case 1: await this.alterarMedico(); break;
      case 2: await this.alterarEnfermeiro(); break;
      case 3: await this.alterarAgente(); break;
    }
  }

  async alterarMedico(){
    this.alertas.showLoading("Alterando médico(a)...");
    let request = {
      nome: this.nome,
      crm: this.crm,
      email: this.email,
      id: this.id
    };

    (await this.cadastroService.updateMedico(request))
      .subscribe(() =>{
        this.alertas.fecharModal();
        this.alertas.sucesso("Médico(a) alterado com sucesso!");
        this.router.navigateByUrl("administrativo");
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async alterarEnfermeiro(){
    this.alertas.showLoading("Alterando enfermeiro(a)...");
    let request = {
      nome: this.nome,
      corem: this.corem,
      email: this.email,
      id: this.id
    };

    (await this.cadastroService.updateEnfermeiro(request))
      .subscribe(() =>{
        this.alertas.fecharModal();
        this.alertas.sucesso("Enfermeiro(a) alterado com sucesso!");
        this.router.navigateByUrl("administrativo");
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

  async alterarAgente(){
    this.alertas.showLoading("Alterando agente administrativo...");
    let request = {
      nome: this.nome,
      cpf: this.cpf,
      email: this.email,
      id: this.id
    };

    (await this.cadastroService.updateAgente(request))
      .subscribe(() =>{
        this.alertas.fecharModal();
        this.alertas.sucesso("Agente administrativo alterado com sucesso!");
        this.router.navigateByUrl("administrativo");
      },error => {
        this.alertas.fecharModal();
        this.alertas.erro(error.error);
      });
  }

}
