import { Component } from '@angular/core';
import { Switalert2Service } from '../service/switalert2.service';
import { NgForm } from '@angular/forms';
import { GlobalbaseService } from '../service/globalbase.service';
@Component({
  selector: 'app-crearperfil',
  templateUrl: './crearperfil.component.html',
  styleUrls: ['./crearperfil.component.css']
})
export class CrearperfilComponent {
  
  constructor(private global:GlobalbaseService,private alerta:Switalert2Service){}

  agregarusu(formulario:NgForm){
    this.global.insertar_usuario(formulario.value)
  }



}
