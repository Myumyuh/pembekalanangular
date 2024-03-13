import { Component } from '@angular/core';

@Component({
  selector: 'app-minicalc',
  templateUrl: './minicalc.component.html',
  styleUrl: './minicalc.component.css'
})
export class MinicalcComponent {
  var1: number;
  var2: number;

  result: number;

  // updateVar1(var1){
  //   this.var1
  // }
  // updateVar2(var2){
  //   this.var2
  // }

  doMultiplication(){
    console.log(this.var1)
    console.log(this.var2)
    return this.result = this.var1 * this.var2;
  }
  doDivision(){
    return this.result = this.var1 / this.var2;
  }
  doAddition(){
    return this.result = this.var1 + this.var2;
  }
  doSubtraction(){
    return this.result = this.var1 - this.var2;
  }
}
