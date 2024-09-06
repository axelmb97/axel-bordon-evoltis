import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { StockFiltersModel } from '../../data/models/stock-filters.model';
import { loadStocks } from 'src/app/core/manager/actions/stocks.actions';
import { StockFilters } from '../../domain/entities/stock-filters.entity';

@Component({
  selector: 'app-stock-filters',
  templateUrl: './stock-filters.component.html',
  styleUrls: ['./stock-filters.component.scss']
})
export class StockFiltersComponent implements OnInit{
  filtersForm: FormGroup = new FormGroup({});


  constructor(
    private builder: FormBuilder,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.initForm()
  }

  initForm() : void {
    this.filtersForm = this.builder.group({
      product: [''],
      quantityGreaterThan: [0],
      quantityLessThan: [0]
    });
  }

  onCleanFilters() : void {
    let filters = new StockFiltersModel();
    this.initForm();
    this.store.dispatch(loadStocks({filters}));
  }


  onFilter() : void {
    let filters = this.getFilters();
    this.store.dispatch(loadStocks({filters}));
  }

  getFilters() : StockFilters {
    let filters = new StockFiltersModel();
    filters.productName = this.filtersForm.get('product')?.value;
    filters.quantityGreaterThan = this.filtersForm.get('quantityGreaterThan')?.value;
    filters.quantityLessThan = this.filtersForm.get('quantityLessThan')?.value;
    return filters;
  }
}
