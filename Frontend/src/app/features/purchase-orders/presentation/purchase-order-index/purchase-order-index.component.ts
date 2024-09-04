import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { cleanOrder } from 'src/app/core/manager/actions/purchase-orders.actions';
import { AppState } from 'src/app/core/manager/app.state';
import { selectPurchaseOrderError, selectPurchaseOrderSuccess } from 'src/app/core/manager/selectors/purchase-order.selectors';

@Component({
  selector: 'app-purchase-order-index',
  templateUrl: './purchase-order-index.component.html',
  styleUrls: ['./purchase-order-index.component.scss']
})
export class PurchaseOrderIndexComponent implements OnInit{

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private router: Router){}

  ngOnInit(): void {
    this.selectPurchaseSuccess();
    this.selectPurchaseError();

  }

  selectPurchaseSuccess() : void {
    this.store.select(selectPurchaseOrderSuccess).subscribe(message => {
      if (message.length == 0) return;
      
      this.messageService.add({
        severity: 'success',
        life: 3000,
        summary: 'Éxito',
        detail: message
      });

      this.store.dispatch(cleanOrder());
      this.redirectToPurchaseOrderList();
    })
  }

  redirectToPurchaseOrderList() : void {
    setTimeout(() => {
      this.router.navigate(['purchase-orders']);
    }, 3000);
  }

  selectPurchaseError() : void {
    this.store.select(selectPurchaseOrderError).subscribe( error => {
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
