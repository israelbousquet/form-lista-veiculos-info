import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, catchError, of, Subject } from 'rxjs';
import { ErrorAlertModalService } from 'src/app/modules/shared/error-alert-modal.service';

//components
import { ErrorAlertComponent } from 'src/app/modules/shared/error-alert/error-alert.component';

//interface
import { VeiculoList } from '../../interfaces/veiculo-list';

//services
import { VeiculosService } from '../../services/veiculos.service';

@Component({
  selector: 'app-lista-veiculos',
  templateUrl: './lista-veiculos.component.html',
  styleUrls: ['./lista-veiculos.component.css'],
})
export class ListaVeiculosComponent implements OnInit {
  public veiculos$!: Observable<VeiculoList[]>;

  public error$ = new Subject<boolean>();

  constructor(
    private veiculosService: VeiculosService,
    private errorAlertModalService: ErrorAlertModalService
  ) {}

  ngOnInit(): void {
    this.veiculos$ = this.veiculosService.getListVeiculos().pipe(
      catchError((error) => {
        console.log(error);
        this.handleError();
        return of();
      })
    );
  }

  handleError() {
    this.errorAlertModalService.alertError(
      'Erro ao carregar a lista. Tente novamente!'
    );
  }
}
