import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ErrorAlertComponent } from './error-alert/error-alert.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorAlertModalService {
  bsModalRef: any;

  constructor(private modalService: BsModalService) {}

  alertError(message: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ErrorAlertComponent);
    bsModalRef.content.type = 'danger';
    bsModalRef.content.message = message;
  }
}
