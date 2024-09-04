import { Component, OnInit } from '@angular/core';
import { PaginatedPurchaseOrders } from '../../domain/entities/paginated-purchases.entity';
import { PurchaseOrderFilters } from '../../domain/entities/purchase-order-filters.entity';
import { MenuItem, MessageService } from 'primeng/api';
import { AppState } from 'src/app/core/manager/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { cleanOrder, deletePurchase, loadPurchaseOrders } from 'src/app/core/manager/actions/purchase-orders.actions';
import { PurchaseOrderFiltersModel } from '../../data/models/purchase-order-filters.model';
import { selectPaginatedPurchaseOrders, selectPurchaseOrderSuccess } from 'src/app/core/manager/selectors/purchase-order.selectors';
import { PaginatorState } from 'primeng/paginator';
import { PurchaseOrderModel } from '../../data/models/purchase-order.model';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.scss']
})
export class PurchaseOrderListComponent implements OnInit{
  purchaseOrdersPagination?: PaginatedPurchaseOrders;
  filters?: PurchaseOrderFilters;
  first: number = 0;
  rows: number = 5;
  items?: MenuItem[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.initFilters();
    this.selectPurchaOrders();
    this.store.dispatch(loadPurchaseOrders({filters: this.filters!}));

  }

  initFilters() : void {
    this.filters = new PurchaseOrderFiltersModel();
  }

  selectPurchaOrders() : void {
    this.store.select(selectPaginatedPurchaseOrders).subscribe(purchases => {
      if (!purchases) return;
      this.purchaseOrdersPagination = purchases;
    })
  }


  onAddPurchaseOrder() : void {
    this.router.navigate(['purchase-orders/add/general']);
  }

  onUpdate(purchase: PurchaseOrderModel) : void {
    this.router.navigate(['purchase-orders',purchase.id,'general']);
    //TODO: ACA se deberia hacer el get details by purchase order id
  }

  onDelete(purchase: PurchaseOrderModel) : void {  
    this.store.dispatch(deletePurchase({id:purchase.id!}));
  }

  onPageChange(event: PaginatorState) {
    
  }
}
