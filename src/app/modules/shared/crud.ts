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

  createVeiculo(value: T) {
    return this.http.post(this.URL, value).pipe(take(1));
  }

  editVeiculo(value: T) {
    return this.http
      .put(`${this.URL}/${value['id' as keyof T]}`, value)
      .pipe(take(1));
  }

  removeVeiculo(id: T) {
    return this.http.delete(`${this.URL}/${id}`).pipe(take(1));
  }

  saveVeiculo(value: T) {
    if (value['id' as keyof T]) {
      return this.editVeiculo(value);
    } else {
      return this.createVeiculo(value);
    }
  }
}
