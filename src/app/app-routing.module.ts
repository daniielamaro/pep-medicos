import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeAdministrativoComponent } from './home-administrativo/home-administrativo.component';
import { HomeMedicoComponent } from './home-medico/home-medico.component';
import { LoginComponent } from './login/login.component';
import { HomeAdministracaoGuard } from './shared/auth/home-administracao.guard';
import { HomeMedicoGuard } from './shared/auth/home-medico.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeAdministrativoComponent },
  { path: 'medico', component: HomeMedicoComponent },
  { path: 'administracao', component: HomeAdministrativoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
