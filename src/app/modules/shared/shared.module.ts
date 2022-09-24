import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorAlertComponent } from './error-alert/error-alert.component';

@NgModule({
  declarations: [ErrorAlertComponent],
  imports: [CommonModule],
  exports: [ErrorAlertComponent],
  entryComponents: [ErrorAlertComponent],
})
export class SharedModule {}
