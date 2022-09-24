import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css'],
})
export class ErrorAlertComponent implements OnInit {
  @Input() message!: string;
  @Input() tipo = 'sucesso';
  
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  onClose(){
    this.bsModalRef.hide();
  }
}
