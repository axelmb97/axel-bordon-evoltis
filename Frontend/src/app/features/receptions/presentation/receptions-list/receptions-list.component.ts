import { Component, OnInit } from '@angular/core';
import { PaginatedReceptions } from '../../domain/entities/paginated-receptions.entity';
import { ReceptionFilters } from '../../domain/entities/reception-filters.entity';
import { ReceptionFiltersModel } from '../../data/models/reception-filters.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { selectReceptionFilters, selectReceptionPagination } from 'src/app/core/manager/selectors/reception.selectors';
import { loadReceptions } from 'src/app/core/manager/actions/receptions.actions';
import { Reception } from '../../domain/entities/reception.entity';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-receptions-list',
  templateUrl: './receptions-list.component.html',
  styleUrls: ['./receptions-list.component.scss']
})
export class ReceptionsListComponent implements OnInit{
  receptionsPagination?: PaginatedReceptions;
  filters?: ReceptionFilters;
  first: number = 0;
  rows: number = 5;
  showModal: boolean = false;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
     this.initFilters();
    this.selectReceptions();
    this.getPaginatedReceptions();
    this.selectReceptionsFilters();
  }

  initFilters() : void {
    this.filters = new ReceptionFiltersModel();
  }

  selectReceptions() : void {
    this.store.select(selectReceptionPagination).subscribe(receptions => {
      if (!receptions) return;
      this.receptionsPagination = receptions;
    })
  }

  getPaginatedReceptions() : void {
    this.store.dispatch(loadReceptions({filters: this.filters!}));
  }

  selectReceptionsFilters() : void {
    this.store.select(selectReceptionFilters).subscribe( filters => {
      if (!filters) return;
      this.filters = filters;
    });
  }

  onAddPurchaseOrder() : void {

  }
  
  onShowDetails(reception: Reception) : void {
    this.showModal = true;
  }

  onUpdate(reception: Reception) : void {

  }

  onDelete(reception: Reception) : void {

  }

  onPageChange(event:PaginatorState) : void {
    this.filters = this.filters?.clone();
    this.filters!.page = event.page! + 1;
    this.getPaginatedReceptions();
  }

  onCloseModal() : void {
    this.showModal = false;
  }
}
