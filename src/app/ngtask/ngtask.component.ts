import { Component } from '@angular/core';

@Component({
  selector: 'app-ngtask',
  templateUrl: './ngtask.component.html',
  styleUrl: './ngtask.component.css'
})
export class NgtaskComponent {

  secretString = 'Sacred Tree';
  secretStuffs = [];
  boolLength = true;
  boolswitch = false;
  
  getRandomizer(){
    this.secretStuffs.push(this.secretString = 'Sacred Tree');
    return this.secretString
  }

  getSecretString(){
    return this.secretString
  }

  checkBoolLength(){
    if (this.secretStuffs.length >=5){
      this.boolLength = false;
    }
    return this.boolLength;
  }

  boolToggle(){
    if (this.boolswitch === false)
    {
      this.boolswitch = true;
      return true;
    } 
    else (this.boolswitch === true)
    {
      this.boolswitch = false;
      return false;
    }
  }
}
