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
    private router: Router){}

  ngOnInit(): void {
    this.selectStockSuccess();
    this.selectStockError();
  }

  selectStockSuccess() : void {
    this.store.select(selectStockSucces).subscribe(message => {
      if (message.length == 0) return;
      
      this.messageService.add({
        severity: 'success',
        life: 3000,
        summary: 'Éxito',
        detail: message
      });

      this.redirectToStockList();
    })
  }

  redirectToStockList() : void {
    setTimeout(() => {
      this.router.navigate(['stocks']);
    }, 3000);
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
