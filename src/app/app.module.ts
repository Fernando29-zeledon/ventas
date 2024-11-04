import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearperfilComponent } from './crearperfil/crearperfil.component';
import { initializeApp } from "firebase/app";
import { GlobalbaseService } from './service/globalbase.service';
import { HttpClientModule } from '@angular/common/http';
import { SalirComponent } from './salir/salir.component';
import { EstanteComponent } from './estante/estante.component';
import { AddProComponent } from './add-pro/add-pro.component';
import { NewProComponent } from './new-pro/new-pro.component';

const firebaseConfig = {
  apiKey: "AIzaSyB3L82UJ0RKTnKFdh0p6zoupsjOuY-bxQo",
  authDomain: "proyecto-de-venta-f913a.firebaseapp.com",
  projectId: "proyecto-de-venta-f913a",
  storageBucket: "proyecto-de-venta-f913a.appspot.com",
  messagingSenderId: "58271846289",
  appId: "1:58271846289:web:02cf4894a53a39b783d430",
  measurementId: "G-SM6E9QP8SJ"
};
initializeApp(firebaseConfig)
const rutas:Routes=[
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'crearperfil', component:CrearperfilComponent},
  {path:'salir', component:SalirComponent},
  {path:'estante', component:EstanteComponent},
  {path:'aggpro', component:AddProComponent},
  {path:'newpro', component:NewProComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    HomeComponent,
    LoginComponent,
    CrearperfilComponent,
    SalirComponent,
    EstanteComponent,
    AddProComponent,
    NewProComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [GlobalbaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
