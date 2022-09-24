import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { FormComponent } from './modules/form/components/form/form.component';
import { ListaVeiculosComponent } from './modules/form/components/lista-veiculos/lista-veiculos.component';

const routes: Routes = [
  {path: '', component: ListaVeiculosComponent},
  {path: 'novo', component: FormComponent},
  {path: 'editar/:id', component: FormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
