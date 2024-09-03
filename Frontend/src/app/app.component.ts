import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './core/manager/app.state';
import { laodSuppliers } from './core/manager/actions/suppliers.actions';
import { loadProducts } from './core/manager/actions/products.actions';
import { loadEmployees } from './core/manager/actions/employees.actions';
import { Observable } from 'rxjs';
import { selectIsAppLoading } from './core/manager/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isLoading$ : Observable<boolean> | undefined;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch(laodSuppliers());
    this.store.dispatch(loadProducts());
    this.store.dispatch(loadEmployees());
  }
  
  selectAppState() : void {
    this.isLoading$ = this.store.select(selectIsAppLoading);
  }
}
