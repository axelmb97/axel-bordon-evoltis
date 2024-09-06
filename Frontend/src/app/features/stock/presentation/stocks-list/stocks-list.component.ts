import { Component, OnInit } from '@angular/core';
import { PaginatedStock } from '../../domain/entities/paginated-stock.entity';
import { StockFilters } from '../../domain/entities/stock-filters.entity';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { StockFiltersModel } from '../../data/models/stock-filters.model';
import { selectStockFilters, selectStockPagination } from 'src/app/core/manager/selectors/stock.selectors';
import { loadStocks } from 'src/app/core/manager/actions/stocks.actions';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit{
  stockPagination?: PaginatedStock;
  filters?: StockFilters;
  first: number = 0;
  rows: number = 5;
  showModal: boolean = false;
  showFilters: boolean = false;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
     this.initFilters();
    this.selectStocks();
    this.getPaginatedStocks();
    this.selectSttockFilters();
  }

  initFilters() : void {
    this.filters = new StockFiltersModel();
  }

  selectStocks() : void {
    this.store.select(selectStockPagination).subscribe(stocks => {
      if (!stocks) return;
      this.stockPagination = stocks;
    })
  }

  getPaginatedStocks() : void {
    this.store.dispatch(loadStocks({filters: this.filters!}));
  }

  selectSttockFilters() : void {
    this.store.select(selectStockFilters).subscribe( filters => {
      if (!filters) return;
      this.filters = filters;
    });
  }

  onPageChange(event:PaginatorState) : void {
    this.filters = this.filters?.clone();
    this.filters!.page = event.page! + 1;
    this.getPaginatedStocks();
  }

  onCloseModal() : void {
    this.showModal = false;
  }

  onShowFilters() : void {
    this.showFilters = true;
  }

  onCloseFilters() : void {
    this.showFilters = false;
  }
}
