import { Component } from '@angular/core';
import { GlobalbaseService } from '../service/globalbase.service';
import { Switalert2Service } from '../service/switalert2.service';

@Component({
  selector: 'app-estante',
  templateUrl: './estante.component.html',
  styleUrls: ['./estante.component.css']
})
export class EstanteComponent { 
  usuario_:any;
  productos:any[]=[];
  mostrar=false;
  urlImg:string="https://aydai.com/wp-content/uploads/2020/11/tienda-online-ERP-ventas.jpg";

  constructor(private global:GlobalbaseService,private alerta:Switalert2Service){}


  ngOnInit(): void {
    this.usuario_=JSON.parse(localStorage.getItem('usuarioLogueado') ?? '');
    if(!navigator.onLine){
      this.alerta.errorConexion('tienes mala conexion para ver tus productos')
      return
    }
    this.global.getMiPro(this.usuario_.id).then(
      objetoCom=>{
        if(objetoCom.exists()){
          this.mostrar=true;
          this.productos = Object.values(objetoCom.val()).slice().reverse();
        }else{
          this.alerta.info('no tienes productos, te sugerimos agregar uno para que los usuarios puedan verlos')
        }
      }
    ).catch(
      error=>{
        this.alerta.info ('error al cargar este usuario');
        console.error(error);
      }
    );
  }

}
