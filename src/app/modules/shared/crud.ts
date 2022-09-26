import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { delay, take } from 'rxjs';

export class Crud<T> {
  constructor(
    protected http: HttpClient,
    @Inject(String)
    private URL: string
  ) {}

  getListVeiculos() {
    return this.http.get<T>(this.URL).pipe(delay(1000));
  }

  editById(id: T) {
    return this.http.get<T>(`${this.URL}/${id}`).pipe(take(1));
  }

  createVeiculo(veiculo: T) {
    return this.http.post(this.URL, veiculo).pipe(take(1));
  }

  editVeiculo(veiculo: T) {
    return this.http
      .put(`${this.URL}/${veiculo['id' as keyof T]}`, veiculo)
      .pipe(take(1));
  }

  removeVeiculo(id: T) {
    return this.http.delete(`${this.URL}/${id}`).pipe(take(1));
  }

  saveVeiculo(veiculo: T) {
    if (veiculo['id' as keyof T]) {
      return this.editVeiculo(veiculo);
    } else {
      return this.createVeiculo(veiculo);
    }
  }
}
