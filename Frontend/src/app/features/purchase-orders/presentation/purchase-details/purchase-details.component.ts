import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { selectProducts } from 'src/app/core/manager/selectors/product.selectors';
import { Product } from 'src/app/features/products/domain/entities/product.entity';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit{
  products: Product[] = [];
  detailsForm: FormGroup = new FormGroup({});

  constructor(
    private store: Store<AppState>,
    private builder: FormBuilder
  ){}

  ngOnInit(): void {
    this.initForm();
    this.selectProducts();
  }

  initForm() : void {
    this.detailsForm = this.builder.group({
      details: this.builder.array([])
    });;
  }

  selectProducts() : void {
    this.store.select(selectProducts).subscribe( products => {
      if (!products) return;
      this.products = products;
    });
  }

  get details() : FormArray {
    return this.detailsForm.get('details') as FormArray;
  }

  addDetail() : void {
    let details = this.createDetail();
    this.details.push(details)
  }

  createDetail(): FormGroup {
    return this.builder.group({
      quantity: [0, [Validators.required, Validators.min(1)]],
      product: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  removeDetail(index: number): void {
    this.details.removeAt(index);
  }
}
