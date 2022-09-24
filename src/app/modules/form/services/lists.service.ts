import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ColorList } from '../interfaces/color-list';
import { FipeList } from '../interfaces/fipe-list';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  constructor(private http: HttpClient) {}


  getFipe(): Observable<Array<any>> {
    return this.http.get<Array<FipeList>>(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas`
    );
  }

  // getModelos(value: string, codigo: number): Observable<Array<any>> {
  //   return this.http.get<Array<any>>(
  //     `https://parallelum.com.br/fipe/api/v1/${value}/marcas/${codigo}/modelos`
  //   );
  // }
}
