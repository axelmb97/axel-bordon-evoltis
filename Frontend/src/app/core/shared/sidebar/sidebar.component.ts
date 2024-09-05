import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../manager/app.state';
import { Router } from '@angular/router';


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

  }

  onNavigate(route:string) : void {
    this.router.navigate([route]);
  }
}
