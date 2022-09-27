import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VeiculoList } from '../interfaces/veiculo-list';
import { delay, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VeiculosService {
  private readonly API = `${environment.API}veiculos`;

  constructor(private http: HttpClient) {}

  getListVeiculos() {
    return this.http.get<VeiculoList[]>(this.API).pipe(delay(1000));
  }

  returnParamsId(id: any) {
    return this.http.get<VeiculoList[]>(`${this.API}/${id}`).pipe(take(1));
  }

  createVeiculo(veiculo: VeiculoList[]) {
    return this.http.post(this.API, veiculo).pipe(take(1));
  }

  editVeiculo(veiculo: any) {
    return this.http.put(`${this.API}/${veiculo.id}`, veiculo).pipe(take(1));
  }

  removeVeiculo(id: any) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

  saveVeiculo(veiculo: any) {
    if (veiculo.id) {
      return this.editVeiculo(veiculo);
    } else {
      return this.createVeiculo(veiculo);
    }
  }
}
