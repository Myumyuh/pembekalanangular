import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { VariantComponent } from './pages/variant/variant.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    VariantComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
