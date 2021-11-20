import { CadastrarFuncionarioComponent } from './adm/home-administrativo/cadastrar-funcionario/cadastrar-funcionario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdministrativoComponent } from './adm/home-administrativo/home-administrativo.component';
import { HomeMedicoComponent } from './medico/home-medico/home-medico.component';
import { LoginComponent } from './login/login.component';
import {NovoAtendimentoComponent} from './medico/home-medico/novo-atendimento/novo-atendimento.component';
import { MedicoGuard } from './shared/auth/medico.guard';
import { AdministrativoGuard } from './shared/auth/administrativo.guard';
import { HistoricoAtendimentoComponent } from './medico/home-medico/historico-atendimento/historico-atendimento.component';
import { HistoricoPrescricaoComponent } from './medico/home-medico/historico-prescricao/historico-prescricao.component';

const routes: Routes = [
  { path: '', component: HomeAdministrativoComponent, canActivate: [AdministrativoGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'medico', component: HomeMedicoComponent, canActivate: [MedicoGuard] },
  { path: 'administrativo', component: HomeAdministrativoComponent, canActivate: [AdministrativoGuard] },
  { path: 'cadastrar-funcionario', component: CadastrarFuncionarioComponent, canActivate: [AdministrativoGuard] },
  { path: 'cadastrar-funcionario/:id/:tipo', component: CadastrarFuncionarioComponent, canActivate: [AdministrativoGuard] },
  { path: 'medico/novo-atendimento', component: NovoAtendimentoComponent, canActivate: [MedicoGuard] },
  { path: 'medico/historico-atendimento', component: HistoricoAtendimentoComponent, canActivate: [MedicoGuard] },
  { path: 'medico/historico-prescricao', component: HistoricoPrescricaoComponent, canActivate: [MedicoGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
