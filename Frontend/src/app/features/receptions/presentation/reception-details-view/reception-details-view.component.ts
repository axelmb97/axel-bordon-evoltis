import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/manager/app.state';
import { Reception } from '../../domain/entities/reception.entity';
import { selectReceptionById } from 'src/app/core/manager/selectors/reception.selectors';

@Component({
  selector: 'app-reception-details-view',
  templateUrl: './reception-details-view.component.html',
  styleUrls: ['./reception-details-view.component.scss']
})
export class ReceptionDetailsViewComponent implements OnInit{
  reception?: Reception;

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.selectReception();
  }

  selectReception() : void {
    this.store.select(selectReceptionById).subscribe(reception => {
      console.log(reception);
      
      this.reception = reception;
    });
  }

}
