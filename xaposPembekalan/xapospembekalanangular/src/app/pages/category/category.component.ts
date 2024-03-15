import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../../models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  public category: Category[] = [];
  public editCategory: Category;
  public deleteCategory: Category;
  
  constructor(private categoryService: CategoryService) {
    this.editCategory = {} as Category;
    this.deleteCategory = {} as Category;
  }

  ngOnInit(): void {
    this.getCategoryAPI();
  }

  public getCategoryAPI(): void{
    this.categoryService.getCategory().subscribe(
      (response: any) => {
        this.category = response.data
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddCategory(addForm: NgForm): void {
    console.log(addForm.value);
    this.categoryService.addCategory(addForm.value).subscribe(
    ()=> {
      this.getCategoryAPI();
      addForm.reset();
      document.getElementById('addCloseModal')?.click();
    },
    (error: HttpErrorResponse)=> {
      const errorObject = JSON.parse(error.error)
      alert(errorObject.data)
      addForm.reset();
    }
    )
  }
  public onEditCategory(editForm: NgForm): void{
    console.log(editForm);
    this.categoryService.editCategory(editForm.value).subscribe(
      (response: any)=>{
        const responseObject = JSON.parse(response)
        this.getCategoryAPI();
        document.getElementById('editCloseModal')?.click();
        alert(responseObject.data)
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
        editForm.reset();
      }
    )
  }
  public onDeleteCategory(deleteForm: NgForm): void{
    console.log(deleteForm.value);
    this.categoryService.deleteCategory(deleteForm.value).subscribe(
      (response: any)=>{
        const responseObject = JSON.parse(response)
        this.getCategoryAPI();
        document.getElementById('deleteCloseModal')?.click();
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
      }
    )
  }


  public onOpenModal(category: Category, mode: string): void { //buat modal muncul
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal'); //manggil fungsi modal
    
    if (mode === 'add'){
      button.setAttribute('data-target', '#addCategoryModal') //manggil modal yang addCategoryModal di html
    }
    if (mode === 'edit'){
      this.editCategory = category;
      button.setAttribute('data-target', '#editCategoryModal') //manggil modal yang editCategoryModal di html
    }
    if (mode === 'delete'){
      this.deleteCategory = category;
      button.setAttribute('data-target', '#deleteCategoryModal')
    }
    

    container!.appendChild(button);
    button.click();

  }
}
