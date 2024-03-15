import { Component, OnInit } from '@angular/core';
import { Variant } from '../../models/variant';
import { VariantService } from '../../services/variant.services';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrl: './variant.component.css'
})
export class VariantComponent implements OnInit{
  public variant: Variant[] = [];
  public updateVariant: Variant;
  public deleteVariant: Variant;

  constructor(private variantService: VariantService) {
    this.updateVariant = {} as Variant;
    this.deleteVariant = {} as Variant;
  }
  ngOnInit(): void {
    this.getVariantAPI();
  }

  public getVariantAPI(): void{
    this.variantService.getVariant().subscribe(
      (response: any) => {
        this.variant = response.data
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddVariant(addForm: NgForm): void {
    this.variantService.addVariant(addForm.value).subscribe(
      ()=>{
        this.getVariantAPI();
        addForm.reset;
        document.getElementById('addVariantCloseModal')?.click();
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
        addForm.reset();
      }
    )
  }

  public onUpdateVariant(editForm: NgForm): void{
    console.log(editForm.value);
    this.variantService.updateVariant(editForm.value).subscribe(
      (response: any)=>{
        const responseObject = JSON.parse(response)
        this.getVariantAPI();
        editForm.reset;
        document.getElementById('editVariantCloseModal')?.click();
        alert(responseObject.data)
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
        editForm.reset();
      }
    )
  }

  public onDeleteVariant(deleteForm: NgForm): void{
    this.variantService.deleteVariant(deleteForm.value).subscribe(
      (response: any)=>{
        const responseObject = JSON.parse(response)
        this.getVariantAPI();
        deleteForm.reset;
        document.getElementById('deleteVariantCloseModal')?.click();
        alert(responseObject.data)
      },
      (error: HttpErrorResponse)=> {
        const errorObject = JSON.parse(error.error)
        alert(errorObject.data)
        deleteForm.reset();
      }
    )
  }


  public onOpenModal(variant: Variant, mode: string): void { //buat modal muncul
    const container = document.getElementById('main-container');
    const button = document.createElement('button');

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal'); //manggil fungsi modal
    
    if (mode === 'add'){
      button.setAttribute('data-target', '#addVariantModal') //manggil modal yang addVariantModal di html
    }
    if (mode === 'edit'){
      this.updateVariant = variant;
      button.setAttribute('data-target', '#editVariantModal') //manggil modal yang editVariantModal di html
    }
    if (mode === 'delete'){
      this.deleteVariant = variant;
      button.setAttribute('data-target', '#deleteVariantModal')
    }
    container!.appendChild(button);
    button.click();
  }
}
