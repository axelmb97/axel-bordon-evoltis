import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component'
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { StepsModule } from 'primeng/steps';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    MessagesModule,
    ToastModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    InputTextModule,
    DynamicDialogModule,
    ProgressSpinnerModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    MessagesModule,
    ToastModule,
    CalendarModule,
    InputNumberModule,
    StepsModule
  ],
  providers: [MessageService]
})
export class SharedModule { }
