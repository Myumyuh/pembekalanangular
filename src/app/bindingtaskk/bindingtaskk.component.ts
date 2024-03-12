import { Component } from '@angular/core';

@Component({
  selector: 'app-bindingtaskk',
  templateUrl: './bindingtaskk.component.html',
  styleUrl: './bindingtaskk.component.css'
})
export class BindingtaskkComponent {
 username = '';


 resetFunc(){
  this.username ='';
 }
}
