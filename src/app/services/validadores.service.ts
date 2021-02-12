import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [propiedad:string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  /*

    {[propiedad:string]: boolean}
      Es un fima de indice (index signature)

      [propName: string]: tipo

          [propiedad: string]: string
          nombre: 'Oscar'

      [propName: number]: any
        '1': 'Saldo de venta'

  */
  noOscar(formControl: FormControl): ErrorValidate {

    /*
      Si si cumple la condicion y genera el error de validacion
      Ver en el FormCntrol el Objeto de errors para ver la propiedad del objeto retornado
    */

    if(formControl.value?.toLowerCase() === 'oscar2'){
      return { noOscar: true}
    }

    // Si no cumple y todo bien
    return null;
  }


  passwordsIguales(nombreCampoPass1: string, nombreCampoPass2: string){

    return (formGroup: FormGroup ) => {
      const pass1 = formGroup.controls[nombreCampoPass1];
      const pass2 = formGroup.controls[nombreCampoPass2];

      if(pass1.value === pass2.value){
          pass2.setErrors(null);
        }else{
        pass2.setErrors({ noEsIgual: true });
      }
    }
  }


  validarUsuario(formControl: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    //  Para validar si el campo es vacio, si es asi, retorna la promesa que todo esta bien y no valida nada
    if(!formControl.value) return Promise.resolve( null );

    return new Promise((resolve, reject) => {
      setTimeout(()=> {

        if(formControl.value === 'Rambo') resolve({ existe: true});
        resolve( null );

      },3500)
    })
  }


}
