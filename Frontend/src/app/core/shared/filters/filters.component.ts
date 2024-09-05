import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() showFilters: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  onCloseFilters() : void {
    this.closeModal.emit(false);
  }
}
