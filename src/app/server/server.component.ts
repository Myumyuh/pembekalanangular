import { Component } from "@angular/core";

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrl: './server.component.css'
    //template: '<p>Server Component Currently Working</p>'

})

export class ServerComponent {
    //Data Binding adalah mekanisme yang digunakan dalam angular untuk
    //menghubungkan bagian-bagian dari tampilan/html dengan data dalam
    //model aplikasi, sehingga perubahan pada satu bagian akan tercermin
    //pada bagian yang lain

    //Ada 3 jenis Data Binding:
    //  - One-way Binding:
    //      - Property Binding
    //      - Interpolation
    //      - Attribute Binding
    //  - Event Binding
    //  - Two-way Binding


    //Directive di angular itu adalah instruksi di HTML yang memberikan perilaku tambahan kepada elemen HTML
    //Di angular terdapat 2 jenis utama dari directives: Structural dan Attribute
    //  - Structural Directive:
    //      - ngIf
    //      - ngFor
    //      - ngSwitch
    //  - Attribute Directive:
    //      - ngStyle  
    //      - ngClass
    //      - ngModel
    serverId: number = 10
    serverStatus: string = 'offline'

    constructor(){
        //ngStyle
        this.serverStatus = Math.random() >= 0.5 ? 'online' : 'offline'
    }
    getServerStatus() {
        return this.serverStatus
    }

    getColor(){
        return this.serverStatus === 'online' ? 'green' : 'red'
    }
}