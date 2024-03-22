import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { VariantComponent } from './pages/variant/variant.component';
import { ProductComponent } from './product/product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { VariantService } from './services/variant.services';
import { ProductService } from './services/product.service';
import { OrdersComponent } from './pages/orders/orders.component';
import { OrdersService } from './services/orders.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    VariantComponent,
    ProductComponent,
    NavbarComponent,
    SidebarComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [CategoryService, VariantService, ProductService, OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
