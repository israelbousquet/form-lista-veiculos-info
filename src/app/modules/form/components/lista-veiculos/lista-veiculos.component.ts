import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, of, Subject } from 'rxjs';
import { ErrorAlertModalService } from 'src/app/modules/shared/error-alert-modal.service';

//components
import { ErrorAlertComponent } from 'src/app/modules/shared/error-alert/error-alert.component';

//interface
import { VeiculoList } from '../../interfaces/veiculo-list';

//services
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-lista-veiculos',
  templateUrl: './lista-veiculos.component.html',
  styleUrls: ['./lista-veiculos.component.css'],
})
export class ListaVeiculosComponent implements OnInit {
  public veiculos$!: Observable<VeiculoList[]>;

  public error$ = new Subject<boolean>();

  constructor(
    private veiculosService: CrudService,
    private errorAlertModalService: ErrorAlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onRefresh();
  }

  handleError() {
    this.errorAlertModalService.alertError(
      'Erro ao carregar a lista. Tente novamente!'
    );
  }

  onEdit(id: number) {
    this.router.navigate([`editar/${id}`], { relativeTo: this.route });
  }

  onRemove(veiculo: any) {
    this.veiculosService.removeVeiculo(veiculo.id).subscribe({
      next: (success) => this.onRefresh(),
    });
  }

  onRefresh() {
    this.veiculos$ = this.veiculosService.getListVeiculos().pipe(
      catchError((error) => {
        this.handleError();
        return of();
      })
    );
  }
}
