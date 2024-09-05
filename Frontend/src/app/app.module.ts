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
import { PurchaseOrderRemoteDataSource, PurchaseOrderRemoteDataSourceBase } from './features/purchase-orders/data/data-sources/purchase-orders-remote.datasource';
import { PurchaseOrderRepositoryBase } from './features/purchase-orders/domain/repositories/purchase-order-base.repository';
import { PurchaseOrderRepository } from './features/purchase-orders/data/repositories/purchase-order.repository';
import { CreatePurchaseOrderUseCase } from './features/purchase-orders/domain/usecases/create-purchase-order.usecase';
import { GetPaginatedPurchaseOrdersUseCase } from './features/purchase-orders/domain/usecases/get-paginated-purchase-orders.usecase';
import { PurchaseOrderIndexComponent } from './features/purchase-orders/presentation/purchase-order-index/purchase-order-index.component';
import { AddPurchaseOrderComponent } from './features/purchase-orders/presentation/add-purchase-order/add-purchase-order.component';
import { EditPurchaseOrderComponent } from './features/purchase-orders/presentation/edit-purchase-order/edit-purchase-order.component';
import { PurchaseOrderListComponent } from './features/purchase-orders/presentation/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderEffects } from './core/manager/effects/purchase-order.effects';
import { PurchaseGeneralDataComponent } from './features/purchase-orders/presentation/purchase-general-data/purchase-general-data.component';
import { PurchaseDetailsComponent } from './features/purchase-orders/presentation/purchase-details/purchase-details.component';
import { PurchaseOrderDetailModalComponent } from './features/purchase-orders/presentation/purchase-order-detail-modal/purchase-order-detail-modal.component';
import { DeletePurchaseOrderUseCase } from './features/purchase-orders/domain/usecases/delete-purchase-order.usecase';
import { GetPaginatedPurchaseOrderDetailsUseCase } from './features/purchase-orders/domain/usecases/get-paginated-purchase-order-details.usecase';
import { GetPurchaseOrderByIdUseCase } from './features/purchase-orders/domain/usecases/get-purchase-order-by-id.usecase';
import { UpdatePurchaseOrderUseCase } from './features/purchase-orders/domain/usecases/update-purchase-order.usecase';
import { PuchaseDetailsViewComponent } from './features/purchase-orders/presentation/puchase-details-view/puchase-details-view.component';
import { PurchaseOrderFiltersComponent } from './features/purchase-orders/presentation/purchase-order-filters/purchase-order-filters.component';
import { ReceptiosIndexComponent } from './features/receptions/presentation/receptios-index/receptios-index.component';
import { ReceptionsListComponent } from './features/receptions/presentation/receptions-list/receptions-list.component';
import { ReceptionRemoteDataSource, ReceptionRemoteDataSourceBase } from './features/receptions/data/data-sources/reception-remote.datasource';
import { ReceptionRepositoryBase } from './features/receptions/domain/repositories/reception-base.repository';
import { ReceptionRepository } from './features/receptions/data/repositories/reception.repository';
import { GetPaginatedReceptionsUseCase } from './features/receptions/domain/usecases/get-paginated-receptions.usecase';
import { ReceptionEffects } from './core/manager/effects/reception.effects';
import { GetReceptionByIdUseCase } from './features/receptions/domain/usecases/get-reception-by-id.usecase';
@NgModule({
  declarations: [
    AppComponent,
    FormatDatePipe,
    PurchaseOrderIndexComponent,
    AddPurchaseOrderComponent,
    EditPurchaseOrderComponent,
    PurchaseOrderListComponent,
    PurchaseGeneralDataComponent,
    PurchaseDetailsComponent,
    PurchaseOrderDetailModalComponent,
    PuchaseDetailsViewComponent,
    PurchaseOrderFiltersComponent,
    ReceptiosIndexComponent,
    ReceptionsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({name: 'TEST'}),
    EffectsModule.forRoot([EmployeeEffects, ProductEffects, SupplierEffects, PurchaseOrderEffects,ReceptionEffects])
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
    {provide: PurchaseOrderRemoteDataSourceBase, useClass: PurchaseOrderRemoteDataSource},
    {provide: PurchaseOrderRepositoryBase, useClass: PurchaseOrderRepository},
    CreatePurchaseOrderUseCase, GetPaginatedPurchaseOrdersUseCase, DeletePurchaseOrderUseCase,
    GetPaginatedPurchaseOrderDetailsUseCase, GetPurchaseOrderByIdUseCase, UpdatePurchaseOrderUseCase,
    {provide: ReceptionRemoteDataSourceBase, useClass: ReceptionRemoteDataSource},
    {provide: ReceptionRepositoryBase, useClass: ReceptionRepository},
    GetPaginatedReceptionsUseCase, GetReceptionByIdUseCase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
