import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { VariantComponent } from './pages/variant/variant.component';
import { ProductComponent } from './product/product.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
    {path: '', redirectTo: 'category', pathMatch: 'full'},
    {path: 'category', component: CategoryComponent},
    {path: 'variant', component: VariantComponent},
    {path: 'product', component: ProductComponent},
    {path: 'orders', component: OrdersComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}