import { Component, OnInit } from '@angular/core';
import { GlobalbaseService } from '../service/globalbase.service';
import { Switalert2Service } from '../service/switalert2.service';

@Component({
  selector: 'app-new-pro',
  templateUrl: './new-pro.component.html',
  styleUrls: ['./new-pro.component.css']
})
export class NewProComponent  implements OnInit {
  productosPubli:any=[];
  constructor(private global:GlobalbaseService,private aler:Switalert2Service) { }
  ngOnInit(): void {
    this.global.obtenerProductos().subscribe(
      (data)=>{
        Object.values(data).forEach(proU=>
          this.productosPubli.push(proU)
        )
      },
      (err)=>{
        this.aler.alertaerror("no se ha podido cargar los productos")
      }
    )
  }

}
