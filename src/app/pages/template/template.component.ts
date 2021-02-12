import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Oscar',
    apellido: 'Melgar',
    correo: 'ommelgar@gmail.com',
    pais: 'SLV', // pais:'SLV'
    genero: 'M'
  };

  paises: any[] =[];

  constructor(public paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
        .subscribe( paises => {
          this.paises = paises;
          this.paises.unshift({nombre:'[Seleccione un pais]', codigo:''})
          console.log(paises);
        });
  }

  guardar(forma: NgForm){
    console.log('Se ha disparado el submit');
    // console.log(forma);

    // Object.values() -> Obtener los objetos y retorna un Array
    Object.values(forma.controls).forEach( control => control.markAsTouched());

    if( forma.invalid) return;

    console.log(forma.value);

  }

}
