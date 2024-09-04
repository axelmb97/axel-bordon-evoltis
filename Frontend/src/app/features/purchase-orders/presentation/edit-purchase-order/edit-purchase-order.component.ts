import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-edit-purchase-order',
  templateUrl: './edit-purchase-order.component.html',
  styleUrls: ['./edit-purchase-order.component.scss']
})
export class EditPurchaseOrderComponent implements OnInit{
  items: MenuItem[] = [];

  constructor() {}
  
  ngOnInit(): void {
    this.initItems();
  }

  initItems() : void {
    this.items = [
      {
          label: 'General',
          routerLink: 'general'
      },
      {
          label: 'Productos',
          routerLink: 'details'
      }
    ];
  }

  onSavePurchaseOrder() : void {

  }

  
}
