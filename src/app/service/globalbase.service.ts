import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { usuario } from '../clasesparaobj/usuario';
import { Router } from '@angular/router';
import { Database,  equalTo, get, getDatabase, orderByChild, query, ref } from 'firebase/database';
import { Switalert2Service } from './switalert2.service';
import { getStorage, ref as refernecia, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable()
export class GlobalbaseService {
  realtime:Database=getDatabase()
  async loginuser(correo:string,constrasenia:string){
    try {
        const realtime:Database =  getDatabase();
        const referencia=ref(realtime,'usuarios')
        const consulta=query(referencia,orderByChild('correo'),equalTo(correo));
        const dataSnapshot=await get(consulta);
        if (!dataSnapshot.exists()) {
          this.alerta.alertaerror('No se encontro nigun correo asociado');
          return false;
        }
        const users:Array<any> = await this.repairData(dataSnapshot);
        const usuario:any = users.find(user  => user.contrasenia === constrasenia);
        if (!usuario) {
          this.alerta.info('Contraseña incorrecta');
          return false;
        }
        let strinusuario=JSON.stringify(usuario);
        localStorage.setItem('usuarioLogueado',strinusuario);
        this.rutas.navigate(['']);
        return true;
    } catch (error) {
      console.log(error);
      this.alerta.alertaerror("vaya parece que ha ocurrido un error");
      return false;
    }
  }
  async repairData (data:any) {
    try {
        var datagood :any= [];
        data.forEach((dato:any) => {
            const key = dato.key;
            let datolisto = dato.val();
            datolisto.id = key;
            datagood.push(datolisto);
        });
        return datagood;
    } catch (error) {
        throw new Error('Error procesando datos: ' + error);
    }
  };
  getMiPro(idavisitar:string){
    const referencia=ref(this.realtime,'proventa')
    const consulta=query(referencia,orderByChild('id_propietario'),equalTo(idavisitar));
    return get(consulta);
  }

  constmibase:string="https://proyecto-de-venta-f913a-default-rtdb.firebaseio.com/"
  constructor(private rutas : Router,private Httpservice:HttpClient,private alerta:Switalert2Service){}
    
  insertar_usuario(usuario:usuario){
    this.Httpservice.post(this.constmibase+'usuarios.json',usuario)
    .subscribe(
      (p:any)=>{
        const usuariogeneral={
          ...usuario,
          id:p.name
        }
        console.log(usuariogeneral)
        let strinusuario=JSON.stringify(usuariogeneral);
        localStorage.setItem('usuarioLogueado',strinusuario);
        this.rutas.navigate(['']);
        this.alerta.alertaExito('hola '+usuario.nombre+' te damos la bienvenida a nuestro sitio de interaccion global')
      }
      ,
      (error)=>{
        this.alerta.alertaerror('vaya parece que ha ocurrido un error al crear tu cuenta, no tienes buena conexion');
      }
    )
  }
  async uploadfile(imag:File){
    try{
      const storag = getStorage();
      const nombreimg:string=this.generarNombreAleatorio();
      const referencia =refernecia(storag, 'productosimg/' + nombreimg);
      await uploadBytes(referencia, imag);
      return await getDownloadURL(referencia);
    }catch(e){
      console.error(e);
      this.alerta.alertaerror('vaya parece que ha ocurrido un error al subir tu imagen');
      return e;
    }
  }
  mandarpro(pro:any){
    return this.Httpservice.post('https://proyecto-de-venta-f913a-default-rtdb.firebaseio.com/proventa.json',pro)
  }
  generarNombreAleatorio(): string {
    const letras = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    let nombreAleatorio = '';
    // Genera 20 letras aleatorias
    for (let i = 0; i < 30; i++) {
      const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
      nombreAleatorio += letraAleatoria;
    }
    // Genera 2 números aleatorios
    for (let i = 0; i < 5; i++) {
      const numeroAleatorio = numeros.charAt(Math.floor(Math.random() * numeros.length));
      nombreAleatorio += numeroAleatorio;
    }
    return nombreAleatorio;
  }
  obtenerProductos(){
    const url = 'https://proyecto-de-venta-f913a-default-rtdb.firebaseio.com/proventa.json';
    // const queryParams = '?orderBy="$key"&limitToLast='+n;
    return this.Httpservice.get(url);
  }
}



