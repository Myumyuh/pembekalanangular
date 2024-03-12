import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.css'
})
export class ServersComponent {

  allowNewServer = false //for Property Binding
  serverCreationStatus = 'No server was created'//for Event Binding
  serverName = '' //Two-way Binding

  serverCreated = false; //Directive ngIf

  servers = ['TestServer', 'TestServer2'] //Directive ngFor

  //Property Binding, time out setelah 10 detik
  constructor(){
    setTimeout(() => {
      this.allowNewServer = true;
    }, 10000)
  }

  //Event Binding
  onCreateServer(){
    this.serverCreated = true; //Directive ngIf
    this.serverCreationStatus = 'Server was Created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event){
    console.log((<HTMLInputElement>event.target).value)
    this.serverName = (<HTMLInputElement>event.target).value
  }

}

//ng generate component servers
