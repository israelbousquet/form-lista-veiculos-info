import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorAlertComponent } from './error-alert/error-alert.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorAlertModalService {
  bsModalRef: any;

  constructor(private modalService: BsModalService) {}

  private showAlert(message: string, tipo: string, timeOut?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(ErrorAlertComponent);
    bsModalRef.content.tipo = tipo;
    bsModalRef.content.message = message;

    if (timeOut) {
      setTimeout(() => bsModalRef.hide(), timeOut);
    }
  }

  alertError(message: string) {
    this.showAlert(message, 'erro', 3000);
  }

  alertSucess(message: string) {
    this.showAlert(message, 'sucess', 2000);
  }
}
