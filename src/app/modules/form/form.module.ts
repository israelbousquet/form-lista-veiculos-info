import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


//pages
import { HomeComponent } from './pages/home/home.component';

//components
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { ErrorMaskComponent } from './components/error-mask/error-mask.component';
import { ListaVeiculosComponent } from './components/lista-veiculos/lista-veiculos.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    FormComponent,
    ErrorMsgComponent,
    ErrorMaskComponent,
    ListaVeiculosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
})
export class FormModule {}
