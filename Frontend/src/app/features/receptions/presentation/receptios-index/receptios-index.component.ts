import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { clearReception } from 'src/app/core/manager/actions/receptions.actions';
import { AppState } from 'src/app/core/manager/app.state';
import { selectPurchaseOrderError } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { selectReceptionError, selectReceptionSuccess } from 'src/app/core/manager/selectors/reception.selectors';

@Component({
  selector: 'app-receptios-index',
  templateUrl: './receptios-index.component.html',
  styleUrls: ['./receptios-index.component.scss']
})
export class ReceptiosIndexComponent implements OnInit{

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private router: Router){}

  ngOnInit(): void {
    this.selectReceptionSuccess();
    this.selectReceptionError();
  }

  selectReceptionSuccess() : void {
    this.store.select(selectReceptionSuccess).subscribe(message => {
      if (message.length == 0) return;
      
      this.messageService.add({
        severity: 'success',
        life: 3000,
        summary: 'Éxito',
        detail: message
      });
      this.store.dispatch(clearReception());
      this.redirectToReceptionList();
    })
  }

  redirectToReceptionList() : void {
    setTimeout(() => {
      this.router.navigate(['receptions']);
    }, 3000);
  }

  selectReceptionError() : void {
    this.store.select(selectReceptionError).subscribe( error => {

      if (!error) return;
      this.messageService.add({
        severity: 'error',
        life: 3000,
        summary: 'Error',
        detail: error?.message
      });
    });
  }
}
