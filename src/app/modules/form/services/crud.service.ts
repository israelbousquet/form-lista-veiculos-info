import { VeiculoList } from './../interfaces/veiculo-list';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Crud } from '../../shared/crud';

@Injectable({
  providedIn: 'root'
})
export class CrudService extends Crud<VeiculoList[]> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}veiculos`);
   }
}
