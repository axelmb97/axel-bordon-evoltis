import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { AppState } from 'src/app/core/manager/app.state';
import { selectStockError, selectStockSucces } from 'src/app/core/manager/selectors/stock.selectors';

@Component({
  selector: 'app-stocks-index',
  templateUrl: './stocks-index.component.html',
  styleUrls: ['./stocks-index.component.scss']
})
export class StocksIndexComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    ){}

  ngOnInit(): void {
    this.selectStockError();
  }

  selectStockError() : void {
    this.store.select(selectStockError).subscribe( error => {

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
