import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../manager/app.state';
import { Router } from '@angular/router';
import { selectShowSidebar } from '../../manager/selectors/global.selectors';
import { hideSidebar } from '../../manager/actions/global.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  sidebar: boolean = true;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectShowSidebar();
  }

  selectShowSidebar() : void {
    this.store.select(selectShowSidebar).subscribe(show => {
      this.sidebar = show;
    })
  }

  hideSidebar() : void {
    this.store.dispatch(hideSidebar());
  }

  onNavigate(route:string) : void {
    this.hideSidebar();
    this.router.navigate([route]);
  }
}
