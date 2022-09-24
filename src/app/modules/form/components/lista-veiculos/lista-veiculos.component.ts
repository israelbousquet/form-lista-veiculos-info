import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { VeiculoList } from '../../interfaces/veiculo-list';
import { VeiculosService } from '../../services/veiculos.service';

@Component({
  selector: 'app-lista-veiculos',
  templateUrl: './lista-veiculos.component.html',
  styleUrls: ['./lista-veiculos.component.css'],
})
export class ListaVeiculosComponent implements OnInit {
  public veiculos$!: Observable<VeiculoList[]>;

  constructor(private veiculosService: VeiculosService) {}

  ngOnInit(): void {
    this.veiculos$ = this.veiculosService.getListVeiculos();
  }
}
