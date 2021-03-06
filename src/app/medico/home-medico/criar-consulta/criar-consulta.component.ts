import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alertas } from 'src/app/shared/class/alertas';
import { CriarConsultaService } from './criar-consulta.service';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { StorageService } from 'src/app/shared/class/storage.service';
import { UrlService } from 'src/app/shared/class/url-service';

@Component({
  selector: 'app-criar-consulta',
  templateUrl: './criar-consulta.component.html',
  styleUrls: ['./criar-consulta.component.scss']
})
export class CriarConsultaComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;

  user: any;

  paciente: any
  listaMedicamento: any[] = [];
  cadastrandoMedicamento: boolean;

  listaTipoConsulta: any;
  tipoConsulta: string = "";

  resumo: string = "";
  observacoes: string = "";

  dataHoje: Date = new Date();

  nomeMedicamento: string = "";
  numQuantidade: number = undefined;
  numIntervalo: number = undefined;
  tipoQuantidade: string = "";
  tipoIntervalo: string = "";
  outraQuantidade: string = "";
  outroIntervalo: string = "";
  usoContinuo: boolean = false;
  dataInicio: Date = undefined;
  dataTermino: Date = undefined;

  constructor(
    private alertas: Alertas,
    private actvRouter: ActivatedRoute,
    private criarConsultaService: CriarConsultaService,
    private router: Router,
    private storage: StorageService,
    private urlService: UrlService
  ) {}

  public downloadAsPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }

  async ngOnInit(): Promise<void> {
    this.user = await this.storage.get("user");
    let token = await this.storage.get("token");
    await this.urlService.validateToken(token);

    console.log(this.user);

    this.actvRouter.params.subscribe(async params => {
      let id = params['id'];
      if(id){
        this.alertas.showLoading("Carregando dados do paciente...");
        (await this.criarConsultaService.getPacienteById(id))
          .subscribe((resp: any) => {
            this.alertas.fecharModal();
            this.paciente = resp;
          },error =>{
            this.alertas.fecharModal();
            this.alertas.erro(error.error);
          });

        (await this.criarConsultaService.getListaConsulta())
          .subscribe((resp: any) => {
            this.listaTipoConsulta = resp;
          },error =>{
            this.alertas.fecharModal();
            this.alertas.erro(error.error);
          });
      }
    });
  }

  cancelarMedicamento(){

    this.nomeMedicamento = "";
    this.numQuantidade = undefined;
    this.numIntervalo = undefined;
    this.tipoQuantidade = "";
    this.tipoIntervalo = "";
    this.outraQuantidade = "";
    this.outroIntervalo = "";
    this.usoContinuo = false;
    this.dataInicio = undefined;
    this.dataTermino = undefined;

    this.cadastrandoMedicamento = false;
  }

  receitarMedicamento(){
    this.cadastrandoMedicamento = false;

    this.listaMedicamento.push({
      nome: this.nomeMedicamento,
      numQuantidade: this.numQuantidade,
      tipoQuantidade: this.tipoQuantidade,
      outraQuantidade: this.outraQuantidade,
      numIntervalo: this.numIntervalo,
      tipoIntervalo: this.tipoIntervalo,
      outroIntervalo: this.outroIntervalo,
      usoContinuo: this.usoContinuo,
      dataInicio: this.dataInicio,
      dataTermino: this.dataTermino
    });

    this.nomeMedicamento = "";
    this.numQuantidade = undefined;
    this.numIntervalo = undefined;
    this.tipoQuantidade = "";
    this.tipoIntervalo = "";
    this.outraQuantidade = "";
    this.outroIntervalo = "";
    this.usoContinuo = false;
    this.dataInicio = undefined;
    this.dataTermino = undefined;
  }

  deletarMedicamentoLista(medicamento: any){
    var index = this.listaMedicamento.indexOf(medicamento);
    if (index > -1) {
      this.listaMedicamento.splice(index, 1);
    }
  }

  cancelarConsulta(){
    this.alertas.warningAlert("Deseja cancelar essa consulta?")
      .then(async (result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl("/medico/novo-atendimento");
        }
      });
  }

  concluirConsulta(){
    this.alertas.warningAlert("Deseja finalizar esta consulta?")
      .then(async (result) => {
        if (result.isConfirmed) {

          this.alertas.showLoading("Finalizando consulta...");

          let contador = 0;

          let date = new Date();

          let requestConsulta = {
            idPaciente: this.paciente.id,
            idTipoConsulta: this.tipoConsulta,
            diaRealizacao: date.toISOString(),
            publico: true,
            resumo: this.resumo,
            observacoes: this.observacoes
          };

          (await this.criarConsultaService.cadastroConsulta(requestConsulta))
            .subscribe(() => {
              contador++;
              if(contador == 2){
                this.alertas.fecharModal();
                this.alertas.sucesso("Consulta finalizada com sucesso!");
                this.router.navigateByUrl("/medico/novo-atendimento");
              }
            },error =>{
              this.alertas.fecharModal();
              this.alertas.erro(error.error);
            });

          if(this.listaMedicamento && this.listaMedicamento.length > 0){
            let requestMedicamento = {
              idPaciente: this.paciente.id,
              medicamentos: this.listaMedicamento
            };

            console.log(requestMedicamento);

            (await this.criarConsultaService.cadastroMedicamento(requestMedicamento))
              .subscribe(() => {
                contador++;
                if(contador == 2){
                  this.alertas.fecharModal();
                  this.alertas.sucesso("Consulta finalizada com sucesso!");
                  this.router.navigateByUrl("/medico/novo-atendimento");
                }
              },error =>{
                this.alertas.fecharModal();
                this.alertas.erro(error.error);
              });
          }else{
            contador++;
            if(contador == 2){
              this.alertas.fecharModal();
              this.alertas.sucesso("Consulta finalizada com sucesso!");
              this.router.navigateByUrl("/medico/novo-atendimento");
            }
          }
        }
      });
  }

}
