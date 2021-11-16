import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlService } from './shared/class/url-service';
import { StorageService } from './shared/class/storage.service';
import { LoginComponent } from './login/login.component';
import { HomeMedicoComponent } from './home-medico/home-medico.component';
import { HomeAdministrativoComponent } from './home-administrativo/home-administrativo.component';
import { CadastrarFuncionarioComponent } from './adm/cadastrar-funcionario/cadastrar-funcionario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeMedicoComponent,
    HomeAdministrativoComponent,
    CadastrarFuncionarioComponent
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
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
