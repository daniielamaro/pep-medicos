import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alertas } from 'src/app/shared/class/alertas';
import { CriarConsultaService } from './criar-consulta.service';

@Component({
  selector: 'app-criar-consulta',
  templateUrl: './criar-consulta.component.html',
  styleUrls: ['./criar-consulta.component.scss']
})
export class CriarConsultaComponent implements OnInit {

  paciente: any
  listaMedicamento: any;

  constructor(
    private alertas: Alertas,
    private actvRouter: ActivatedRoute,
    private criarConsultaService: CriarConsultaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actvRouter.params.subscribe(async params => {
      let id = params['id'];
      if(id){
        this.alertas.showLoading("Carregando dados do paciente...");
        (await this.criarConsultaService.getPacienteById(id))
          .subscribe((resp: any) => {
            this.alertas.fecharModal();
            this.paciente = resp;
            console.log(this.paciente);
          },error =>{
            this.alertas.fecharModal();
            this.alertas.erro(error.error);
          });
      }
    });
  }

  cancelarConsulta(){
    this.alertas.warningAlert("Deseja cancelar essa consulta?")
      .then(async (result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl("/medico/novo-atendimento");
        }
      });
  }

}
