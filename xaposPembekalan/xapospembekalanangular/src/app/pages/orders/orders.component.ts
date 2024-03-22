import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderDetails } from '../../models/orderdetail';
import { OrdersService } from '../../services/orders.service';
import { OrderHeader } from '../../models/orderheader';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  public product: Product[] = []; //menampung array dari data Product
  public listItem: OrderDetails[] = []; //menampung array dari data OrderDetails
  public orderHeader: OrderHeader[] = [];
  public orderDetails: OrderDetails[] = [];
  public paymoney = 0;            public searchString: string = '';
  public amount = 0;              public perPage: number = 5;
  public monchange = 0;           public currentPage: number = 1;
  public reference: string ='';   

  constructor(private productService: ProductService, private orderService: OrdersService){}

  public getProductAPI(): void {
    this.productService.getProduct().subscribe(
      (response: any)=> {
        this.product = response.data
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  } //getProductAPI

  public total_pages: number = 1;
  public fakeArray = new Array(this.total_pages);

  // public searchProductAPI(param: NgForm): void{      // NgForm
  //   console.log(param);
    
  //   this.productService.searchProduct(param).subscribe(
  //     (response: any)=> {
  //       this.product = response.data
  //       this.total_pages = response.total_page
  //       this.fakeArray = new Array(this.total_pages);
  //     },
  //     (error: HttpErrorResponse)=> {
  //       alert(error.message)
  //     }
  //   )
  // }
  public searchProductAPI(searchstr: string, perpage: number, page: number): void{      // manual param
    this.productService.searchProduct(searchstr, perpage, page).subscribe(
      (response: any)=> {
        this.product = response.data
        this.total_pages = response.total_page
        this.fakeArray = new Array(this.total_pages);
        this.currentPage = page;
        if (page === 1){ //penjagaan biar Previous nggak bablas kebawah 1
          document.getElementById('prevsearchpg').setAttribute('disabled', 'disabled')
          document.getElementById('prevsearchpg').style.cursor = 'not-allowed';
        } else {
          document.getElementById('prevsearchpg').removeAttribute('disabled')
          document.getElementById('prevsearchpg').style.cursor = 'pointer';
        }
        if (page === this.total_pages){ //penjagaan biar Next nggak bablas ngelebihi total halaman
          document.getElementById('nextsearchpg').setAttribute('disabled', 'disabled')
          document.getElementById('nextsearchpg').style.cursor = 'not-allowed';
        } else {
          document.getElementById('nextsearchpg').removeAttribute('disabled')
          document.getElementById('nextsearchpg').style.cursor = 'pointer';
        }
      },
      (error: HttpErrorResponse)=> {
        alert(error.message)
      }
    )
  }

  public getOrderHeaderAPI(): void {
    this.orderService.getOrderHeader().subscribe(
      (response:any)=> {
        this.orderHeader = response.data
        
      },
      (error: HttpErrorResponse)=> {
        alert(error.message)
      }
      )
  }
  public getOrderDetailsAPI(header_id: number): void {
    this.orderService.getCustomOrderDetails(header_id).subscribe(
      (response: any)=> {
        this.orderDetails = response.data
      },
      (error: HttpErrorResponse)=> {
        alert(error.message)
      }
    )
  }
  ngOnInit(): void {
    this.getOrderHeaderAPI();
  }

  public moneychange(): any {
    this.monchange = this.paymoney-this.amount;
    if (this.monchange < 0){
      return 'Insufficient fund'
    } else {
      return this.paymoney-this.amount
    }
  }
  public selectitemorder(product: any): void {
    const updatedata: OrderDetails = {
      ...product, 
      quantity: 1
    }
    this.listItem = [...this.listItem, updatedata];// ... itu spread syntax, kyk looping array, tanpa ... array akan dimunculkan sekalian kurungnya, tanpa itu, semua data dimunculkan value PER data isi array 
    //console.log(product);
  }
  public removeitemorder(index: number): void {
    this.listItem.splice(index, 1)
  }
  public calculateTotal(item: any): number {
    return item.quantity * item.product_price;
  }
  public totalQuantity(item: any): number{
    var totalQuantity = 0;
    //console.log(item);
    for (let i = 0; i < item.length; i++) {
      totalQuantity = totalQuantity + item[i].quantity;
      
    }
    //console.log(totalAmount);
    return totalQuantity;
  }
  public totalAmount(item: any): number {
    var totalAmount = 0;
    for (let index = 0; index < item.length; index++) {
      totalAmount = totalAmount + (item[index].product_price * item[index].quantity);
    }
    //console.log(totalAmount);
    this.amount = totalAmount;


    return totalAmount
  }
  public orderPayments(): void{
    const send = {
      listItem: this.listItem
    }
    if (this.monchange < 0 || this.paymoney === 0 || this.paymoney === null){
      alert('Denied')
      
    } else {
      this.orderService.addOrder(send).subscribe(
        (response: any)=> {
          // document.getElementById('submitbayar').setAttribute('hidden', 'hidden')
          // document.getElementById('inputquantity').setAttribute('readonly', 'readonly')
          // document.getElementById('addorderbtn').setAttribute('disabled', 'disabled')
          // document.getElementById('inputpaymoney').setAttribute('readonly', 'readonly')
          const resObj = JSON.parse(response)
          this.reference = resObj.data.reference
          //console.log(response);
        },
        (error: HttpErrorResponse)=> {
          alert: error
        }
        )
      
    }
    

  }
  
  public onOpenModal(mode: String): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    const searchbutton = document.getElementById('searchbutton');

    button.type = 'button'
    button.style.display = 'none'
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'neworder'){
      this.getProductAPI();
      button.setAttribute('data-target', '#newOrderModal')
      searchbutton?.click();
    }
    if (mode === 'payment'){
      button.setAttribute('data-target', '#paymentModal')
    }
    container!.appendChild(button);
    button.click();
  }

  public toggleEdit(check: boolean): void{
    if (check){
      document.getElementById('fieldlistitem').setAttribute('disabled', `${check}`) //ato pakek class???
      document.getElementById('fieldneworder').setAttribute('disabled', `${check}`)
      document.getElementById('fieldpayment').setAttribute('disabled', `${check}`)
      document.getElementById('submitbayar').setAttribute('hidden', `${check}`)
    } else if (!check){
      document.getElementById('fieldlistitem').removeAttribute('disabled')
      document.getElementById('fieldneworder').removeAttribute('disabled')
      document.getElementById('fieldpayment').removeAttribute('disabled')
      document.getElementById('submitbayar').removeAttribute('hidden')
    }
    
  }

}
