import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  // Crear un formulario
  forma: FormGroup;

  // FormBuilder nos permite configurar el formulario
  constructor( private fb: FormBuilder,
                private validadoresService: ValidadoresService ) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
    // Se debe crear despues de haber creado el formulario
    this.crearListener();
  }

  ngOnInit(): void {
  }



  /*
    #### NOTAS ####

    FormGroup   -> Es un Formulario <form>
    FormControl -> Es un input <input>
    FormBuilder -> Especifica Atributos y validaciones para cada FormControl
    FormArray   -> Es un array de FormControl

    Ejemplo de formulario basico

    this.formularioFormGroup = this.formularioFormBuilder.group({
      nombreCampoFormControl: ['valorPorDefecto',[ValidatorsSincronos],[ValidatorAsincronos]]
    });


  */


  // Establecer las alertas

  /*
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get nombreValido(){
    return this.forma.get('nombre').valid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get apellidoValido(){
  return this.forma.get('apellido').valid && this.forma.get('apellido').touched;
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get correoValido(){
    return this.forma.get('correo').valid && this.forma.get('correo').touched;
  }


  get distritoNoValido(){
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }
  get distritoValido(){
    return this.forma.get('direccion.distrito').valid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
  get ciudadValido(){
    return this.forma.get('direccion.ciudad').valid && this.forma.get('direccion.ciudad').touched;
  }

  */


  noValido(campo: string): boolean {
    if(!this.forma.get(campo)){
      console.log('Campo no encontrado - NoValido')
        return false;
    }
    return this.forma.get(campo).invalid && this.forma.get(campo).touched;
  }

  valido(campo: string): boolean {
    if(!this.forma.get(campo)){
        console.log('Campo no encontrado - Valido')
        return false;
    }
    return this.forma.get(campo).valid && this.forma.get(campo).touched;
  }

  passNoIguales(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return pass1 !== pass2 ? true : false;

  }




  /*
    Getter para los formControl pasatiempos

    Si no especificamo es tipo de tetorno, sera de AbstractControl
    as FormArray: espeocificamos el tipo; Array de FormControl

  */
  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }
  /*




  Sintaxis:
    this.fb.group({
        nombre: [valorDefecto, validadoresSincronos, validadoresAsincronos],

        - validadoresSincronos
          Validaciones que se aplican directamente de manera simutanea en el formulario
          si es una sola una regla de validacion se pude dejar sin especificar un arreglo

            .min         Ocupado para números
            .minLength() Ocupado para la cantidad de caracteres

        - validadoresAsincronos
          Ocupado cuando se realizan peticiones web

        Para crear campos anidados solo agregamos otro FormBuilder y especificamos cada campo

    Array de Controles

    this.fb.array([]);
      FormControl dimicos
      Se debe especificar por lo menos un array vacio

    Validadores globales
      Se aplican al formulario cuando los campos ya estan definidos
      y asi poder manipular la informacion y validarla

      El validador retorna una funcion y esa funcion recibe como parametro todo el formulario FormGroup

      Ver ejemplo de password

  */
  crearFormulario(){
    // Configuracion del formulario

    // En las validaciones personalizadas ponenemos la referencia pero no la ejecucion del metodo, sin () al final
      this.forma = this.fb.group({
        nombre:   ['', [Validators.required, Validators.minLength(5), this.validadoresService.noOscar]],
        apellido: ['', [Validators.required, Validators.minLength(5)]],
        usuario:  ['', , this.validadoresService.validarUsuario],
        correo:   ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        pass1: ['', Validators.required ],
        pass2: ['', Validators.required ],
        direccion: this.fb.group({
          municipio:    ['', Validators.required],
          departamento: ['', Validators.required]
        }),
        pasatiempos: this.fb.array([])
      },{
        validators: [this.validadoresService.passwordsIguales('pass1', 'pass2')]
      });
  }


  crearListener(){
    // Global mustra los valores de los campos
    // this.forma.valueChanges.subscribe( valores => console.log(valores));

    // Global el estado del formulario
    /*
      En JavaScript primero se resuelen las tarea sincronas y despues las tareas asincronas
    */
    // this.forma.statusChanges.subscribe( status => console.log({ status }));

    // ver un campo especifico
    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }


/*
.setValue({})
    Se debe especificar un valor para cada campo del formulario de manera obligatoria

.reset();
    Borra el estado actual del formulario estableciendo cada campo a null
    pero ademas nos permite establecer valores por defectoa a los campos que lo necesiten
    y no es necesario especificar cada campo como el metodo .setValue()

    .reset({
      nombre: 'Valor inicial'
    })

    Se ha usado asi por conveniencia

*/
  cargarDataAlFormulario(){

    this.forma.reset({
      nombre: 'Oscar',
      apellido: 'Melgar',
      correo: 'ommelgar@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        municipio: 'San Juan Opico',
        departamento: 'La Libertad'
      }
    });

    /*
      Agregar datos por defecto al Array de FormControl

      pasatiempos: ['Correr', 'Caminar']   -> No funnciona así
    */

    ['Comer', 'Correr'].forEach( valorPasatiempo => this.pasatiempos.push(this.fb.control(valorPasatiempo)));

    this.pasatiempos.push(this.fb.control('Nuevo FormControl con valor por defecto'));

    /*
      Ocupar el .setValue() pero tendriamos que especificar cada campo
    */

  }




  agregarPasatiempo(){
    // Con validaciones el nuevo FormControl
    // this.pasatiempos.push(this.fb.control('', [Validators.required]));
    this.pasatiempos.push(this.fb.control(''));
  }



  borrarPasatiempo(indicePasatiempo: number){
     /*
        .removeAt(indice)
            Remueve el FormControl de un FormArray
    */

      this.pasatiempos.removeAt(indicePasatiempo);
  }




  guardar(){
    Object.values(this.forma.controls).forEach( control => {

      if( control instanceof FormGroup ) Object.values( control.controls).forEach( control => control.markAsTouched());
      control.markAsTouched();

    });

    if(this.forma.invalid) return;

    console.log(this.forma);

  }
}
