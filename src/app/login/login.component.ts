import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Switalert2Service } from '../service/switalert2.service';
import { NgForm } from '@angular/forms';
import { GlobalbaseService } from '../service/globalbase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private global:GlobalbaseService,private router:Router,private alerta:Switalert2Service){}
  // , private misuarios:MisusuariosService estas son otras cosas que se deben de agregar al constructor
  ngOnInit(): void {
    if(localStorage.getItem('usuarioLogueado')!=null){
      this.router.navigate([''])
    }
  }

  entrar(formulario:NgForm){
    let usuariotext=formulario.value.usuario;
    let contrasenia=formulario.value.contrasena;


    if(contrasenia=="" || usuariotext=="")
    {
      this.alerta.alertasencilla('los campos son obligatorios')
      return;
    }
    this.global.loginuser(usuariotext,contrasenia);

  }
  ir(cadena:string){
    this.router.navigate([cadena])
  }

}
