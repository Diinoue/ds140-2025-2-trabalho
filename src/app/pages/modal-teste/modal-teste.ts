import { Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-teste',
  imports: [],
  templateUrl: './modal-teste.html',
  styleUrl: './modal-teste.css'
})
export class ModalTeste {
  @Input() Input!: any;


constructor(
  public activeModal: NgbActiveModal,
) {}

fechar() {
  this.activeModal.close();
}
}
