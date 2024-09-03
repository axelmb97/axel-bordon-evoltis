import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './core/shared/shared.module';
import { FormatDatePipe } from './core/pipes/format-date.pipe';
import { HttpServiceBase } from './core/services/http-service.base';
import { HttpService } from './core/services/http-service.implementation';
import { EmployeeRemoteDataSourceBase, EmployeeRemoteDataSource } from './features/employees/data/data-sources/employee-remote.datasource';
import { EmployeeRepository } from './features/employees/data/repositories/employee.repository';
import { EmployeeRepositoryBase } from './features/employees/domain/repositories/employee-base.repository';
import { GetAllEmployeesUseCase } from './features/employees/domain/usecases/get-all-employees.usecase';
import { ProductRemoteDataSourceBase, ProductRemoteDataSource } from './features/products/data/data-sources/product-remote.datasource';
import { ProductRepository } from './features/products/data/repositories/product.repository';
import { ProductRepositoryBase } from './features/products/domain/repositories/product-base.repository';
import { GetAllProductsUseCase } from './features/products/domain/usecases/get-all-products.usecase';
import { SupplierRemoteDataSourceBase, SupplierRemoteDataSource } from './features/suppliers/data/data-sources/suppliers-remote.datasource';
import { SupplierRepository } from './features/suppliers/data/repositories/supplier.repository';
import { SupplierRepositoryBase } from './features/suppliers/domain/repositories/supplier-base.repository';
import { GetAllSuppiersUseCase } from './features/suppliers/domain/usecases/get-all-suppliers.usecase';
import { ROOT_REDUCERS } from './core/manager/app.state';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './core/manager/effects/employee.effects';
import { ProductEffects } from './core/manager/effects/product.effects';
import { SupplierEffects } from './core/manager/effects/supplier.effects';
@NgModule({
  declarations: [
    AppComponent,
    FormatDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({name: 'TEST'}),
    EffectsModule.forRoot([EmployeeEffects, ProductEffects, SupplierEffects])
  ],
  providers: [
    {provide: HttpServiceBase, useClass: HttpService},
    {provide: SupplierRemoteDataSourceBase, useClass: SupplierRemoteDataSource},
    {provide: SupplierRepositoryBase, useClass: SupplierRepository},
    GetAllSuppiersUseCase,
    {provide: ProductRepositoryBase, useClass: ProductRepository},
    {provide: ProductRemoteDataSourceBase, useClass: ProductRemoteDataSource},
    GetAllProductsUseCase,
    {provide: EmployeeRemoteDataSourceBase, useClass: EmployeeRemoteDataSource},
    {provide: EmployeeRepositoryBase, useClass: EmployeeRepository},
    GetAllEmployeesUseCase,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
