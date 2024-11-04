import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { GlobalbaseService } from '../service/globalbase.service';
import { Switalert2Service } from '../service/switalert2.service';
import { FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-pro',
  templateUrl: './add-pro.component.html',
  styleUrls: ['./add-pro.component.css']
})
export class AddProComponent implements OnInit {
  @ViewChild('botonEnvio') contenedor: ElementRef;
  imag: File;
  urlimgactual = '';
  formventa: FormGroup;
  indexusu:string = '';
  
  
  constructor(private golbal: GlobalbaseService,private alerta:Switalert2Service,private ruta:Router) {
    this.formventa = new FormGroup(
      {
        nombre: new FormControl(),
        precio: new FormControl(),
        descripcion: new FormControl(),
        categoria: new FormControl(),
      }
    )
  }
  ngOnInit(): void {
      const usuariomi:any = JSON.parse(localStorage.getItem('usuarioLogueado') ?? '');
      this.indexusu = usuariomi.id;
  }

  cargarImagen(e: any) {
    this.imag = e.target.files[0];
    if (this.imag) {
      this.urlimgactual = URL.createObjectURL(this.imag);
    }
  }
  async venderpro() {
    let formm = this.formventa.value;
    if (this.imag) {

      if (formm.nombre != null && formm.precio != null && formm.categoria != null) {
        if(!navigator.onLine){
          this.alerta.errorConexion('verifica tu conexion he intenta de nuevo');
          return;
        }
        try {
          
          const uriImg= await this.golbal.uploadfile(this.imag);
          const pro:any={
            nombre:formm.nombre,
            precio:formm.precio,
            descripcion:formm.descripcion,
            categoria:formm.categoria,
            urlImg:uriImg,
            id_propietario:this.indexusu,
          }
          this.golbal.mandarpro(pro).subscribe(
            (res)=>{
              this.alerta.alertaExito('el producto ha sido piblicado correctamente');
            }
            ,
            (e)=>{
              this.alerta.alertaerror('vaya parece que ha ocirrido un error');
            }
          )

        } catch {
          this.alerta.alertasencilla('no se pudo concretar la accion')
        }


      } else {
        this.alerta.alertasencilla('todos los campos son obligatorios')
      }


    } else {
      this.alerta.alertacontiempo(2000,'no has selecionado una imagen')
    }

  }

}
