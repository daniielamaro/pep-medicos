import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlService } from './shared/class/url-service';
import { StorageService } from './shared/class/storage.service';
import { LoginComponent } from './login/login.component';
import { HomeMedicoComponent } from './medico/home-medico/home-medico.component';
import { HomeAdministrativoComponent } from './adm/home-administrativo/home-administrativo.component';
import { CadastrarFuncionarioComponent } from './adm/home-administrativo/cadastrar-funcionario/cadastrar-funcionario.component';
import { NovoAtendimentoComponent } from './medico/home-medico/novo-atendimento/novo-atendimento.component';
import { HistoricoAtendimentoComponent } from './historico-atendimento/historico-atendimento.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeMedicoComponent,
    HomeAdministrativoComponent,
    CadastrarFuncionarioComponent,
    NovoAtendimentoComponent,
    HistoricoAtendimentoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UrlService,
    StorageService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
