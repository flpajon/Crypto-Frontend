import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Transaction } from 'src/app/models/transaction/transaction.model';

@Component({
  selector: 'app-dialog-buy-confirm',
  templateUrl: './dialog-buy-confirm.component.html',
  styleUrls: ['./dialog-buy-confirm.component.css']
})
export class DialogBuyConfirmComponent {

  @Input() public transaction!: Transaction

  constructor(public activeModal: NgbActiveModal) { }

  //Se cierra el dialog devolviendo un resultado (true = confirmar, false = cancelar)
  close(fueConfirmado: Boolean) {
    this.activeModal.close(fueConfirmado)
  }
}
