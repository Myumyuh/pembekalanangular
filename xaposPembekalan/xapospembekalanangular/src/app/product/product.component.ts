import { Component } from '@angular/core';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Variant } from '../models/variant';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { VariantService } from '../services/variant.services';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  public product: Product[] = [];
  public editProduct: Product;
  public deleteProduct: Product;
  public category: Category[] = [];
  public variant: Variant[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService, private variantService: VariantService){
    this.editProduct = {} as Product;
    this.deleteProduct = {} as Product;
  }
  ngOnInit(): void {
    this.getProductAPI();
    this.getVariantAPI();
    this.getCategoryAPI();
  }

  public getProductAPI(): void{
    this.productService.getProduct().subscribe(
      (response: any)=> {
        this.product = response.data
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public getVariantAPI(): void{
    this.variantService.getVariant().subscribe(
      (response: any)=> {
        this.variant = response.data
      },
      (error: HttpErrorResponse)=> {
        alert(error.message)
      }
    )
  }
  public getCategoryAPI(): void{
    this.categoryService.getCategory().subscribe(
      (response: any)=> {
        this.category = response.data
      },
      (error: HttpErrorResponse)=> {
        alert(error.message)
      }
    )
  }
  public getCustomVariantAPI(event): void{
    const categoryid = (<HTMLSelectElement>event.target).value;
    //console.log(categoryid);
    
    this.variantService.getCustomVariant().subscribe(
      (response: any)=> {
        this.variant = response.data
        console.log(this.variant);
        
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
      }
    )
  }

  public onAddProduct(addForm: NgForm): void{
    this.productService.addProduct(addForm.value).subscribe(
      ()=>{
        this.getProductAPI();
        addForm.reset();
        document.getElementById('addProductCloseModal')?.click();
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
        addForm.reset();
      }
    )
  }

  public onEditProduct(editForm: NgForm): void{
    this.productService.editProduct(editForm.value).subscribe(
      (response: any)=> {
        const responseObject = JSON.parse(response)
        this.getVariantAPI();
        this.getCategoryAPI();
        document.getElementById('editProductCloseModal')?.click();
        alert(responseObject.data)
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
      }
    )
  }

  public onDeleteProduct(deleteForm: NgForm): void{
    this.productService.deleteProduct(deleteForm.value).subscribe(
      (response: any)=> {
        const responseObject = JSON.parse(response)
        this.getProductAPI();
        document.getElementById('deleteProductCloseModal')?.click();
        alert(responseObject.data)
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
      }
    )
  }

  public onOpenModal(product: Product, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add'){
      console.log('test')
      button.setAttribute('data-target', '#addProductModal')
    }
    if (mode === 'edit'){
      console.log('testedit');
      this.editProduct = product;
      button.setAttribute('data-target', '#editProductModal')
    }
    if (mode === 'delete'){
      this.deleteProduct = product;
      button.setAttribute('data-target', '#deleteProductModal')
      
    }
    container!.appendChild(button);
    button.click();
  }


}
