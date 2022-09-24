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

  postVeiculo(veiculo: VeiculoList[]) {
    return this.http.post(this.API, veiculo).pipe(take(1));
  }
}
