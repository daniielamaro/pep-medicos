import { CadastrarFuncionarioComponent } from './adm/home-administrativo/cadastrar-funcionario/cadastrar-funcionario.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdministrativoComponent } from './adm/home-administrativo/home-administrativo.component';
import { HomeMedicoComponent } from './medico/home-medico/home-medico.component';
import { LoginComponent } from './login/login.component';
import {NovoAtendimentoComponent} from './medico/home-medico/novo-atendimento/novo-atendimento.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'medico', component: HomeMedicoComponent },
  { path: 'administrativo', component: HomeAdministrativoComponent },
  { path: 'administrativo/cadastrar-funcionario', component: CadastrarFuncionarioComponent },
  { path: 'medico/novo-atendimento', component: NovoAtendimentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
