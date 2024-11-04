import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  constructor(private activ:Router){}
  ngOnInit(): void {
  }
  ir(enlace:string){
    this.activ.navigate([enlace])
  }

  estaloguado()
  {
    if(localStorage.getItem('usuarioLogueado')!=null){
      return true;
    }else{
      return false;
    }
  }

}
