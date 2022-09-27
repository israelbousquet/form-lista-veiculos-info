import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, Subject } from 'rxjs';
import { ErrorAlertModalService } from 'src/app/modules/shared/error-alert-modal.service';

//interface
import { VeiculoList } from '../../interfaces/veiculo-list';

//services
import { VeiculosService } from '../../services/crud-veiculos.service';

@Component({
  selector: 'app-lista-veiculos',
  templateUrl: './lista-veiculos.component.html',
  styleUrls: ['./lista-veiculos.component.css'],
})
export class ListaVeiculosComponent implements OnInit {
  public veiculos$!: Observable<VeiculoList[]>;

  constructor(
    private veiculosService: VeiculosService,
    private errorAlertModalService: ErrorAlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadList();
  }

  onEdit(id: number) {
    this.router.navigate([`editar/${id}`]);
  }

  onRemove(veiculo: any) {
    this.veiculosService.removeVeiculo(veiculo.id).subscribe({
      next: () => this.loadList(),
    });
  }

  loadList() {
    this.veiculos$ = this.veiculosService.getListVeiculos().pipe(
      catchError(() => {
        this.errorLoadList();
        return of();
      })
    );
  }

  errorLoadList() {
    this.errorAlertModalService.alertError(
      'Erro ao carregar a lista. Tente novamente!'
    );
  }
}
