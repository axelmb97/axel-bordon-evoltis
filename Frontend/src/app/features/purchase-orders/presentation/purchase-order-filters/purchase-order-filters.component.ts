import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadPurchaseOrders } from 'src/app/core/manager/actions/purchase-orders.actions';
import { AppState } from 'src/app/core/manager/app.state';
import { PurchaseOrderFilters } from '../../domain/entities/purchase-order-filters.entity';
import { PurchaseOrderFiltersModel } from '../../data/models/purchase-order-filters.model';

@Component({
  selector: 'app-purchase-order-filters',
  templateUrl: './purchase-order-filters.component.html',
  styleUrls: ['./purchase-order-filters.component.scss']
})
export class PurchaseOrderFiltersComponent implements  OnInit{
  filtersForm: FormGroup = new FormGroup({});
  minDate : Date = new Date();

  constructor(
    private builder: FormBuilder,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm() : void {
    this.filtersForm = this.builder.group({
      businessName: [''],
      from: [new Date()],
      to: [new Date()]
    });
  }

  onCleanFilters() : void {
    let filters = new PurchaseOrderFiltersModel();
    this.initForm();
    this.store.dispatch(loadPurchaseOrders({filters}));
  }


  onFilter() : void {
    let filters = this.getFilters();
    this.store.dispatch(loadPurchaseOrders({filters}));
  }

  getFilters() : PurchaseOrderFilters {
    let filters = new PurchaseOrderFiltersModel();
    filters.businessName = this.filtersForm.get('businessName')?.value;
    filters.from = this.filtersForm.get('from')?.value;
    filters.to = this.filtersForm.get('to')?.value;
    return filters;
  }
}
