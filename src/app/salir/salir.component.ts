import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salir',
  templateUrl: './salir.component.html',
  styleUrls: ['./salir.component.css']
})
export class SalirComponent {
  constructor( private router:Router){}
  ngOnInit(): void {}
  async salir(){
    localStorage.removeItem('usuarioLogueado');
    await this.router.navigate(['']);
    window.location.reload();
  }
  ir(cadena:string){
    this.router.navigate([cadena]);
  }
}
