import { Component } from '@angular/core';
import { usuario } from '../clasesparaobj/usuario';
import { Switalert2Service } from '../service/switalert2.service';
import { Router } from '@angular/router';
Router
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  persona:usuario= new usuario('','','');
  direccionimg:string='url(https://firebasestorage.googleapis.com/v0/b/proyecto-chat-e71cc.appspot.com/o/sin-foto-hombre.jpg?alt=media&token=9cc33480-0043-4339-9af0-a8db9a261805)';
  nombreDeBusqueda:string="";
  usuariosEncontrados:any[]=[];
  mensajeDeBusqueda="busca algun usuario usando su nombre";

  constructor(private rutas:Router,private alerta:Switalert2Service){
  }
  ngOnInit(): void {
    if(localStorage.getItem('usuarioLogueado')!=null){
      let miusuariologueado=JSON.parse(localStorage.getItem('usuarioLogueado') ?? '');
      this.persona.contrasenia=miusuariologueado.contrasenia;
      this.persona.id=miusuariologueado.id;
      this.persona.nombre=miusuariologueado.nombre;
      this.persona.correo=miusuariologueado.correo;
    }
  }
  buscar(){
  }
  ir(p:string){
    this.rutas.navigate([p]);
  }

}
