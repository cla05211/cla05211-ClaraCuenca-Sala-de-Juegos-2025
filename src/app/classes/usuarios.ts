export class Usuario 
{
    correo: String
    nombre: String;
    apellido: String;
    edad: Number;

    constructor(correo:string, nombre: string, apellido:string, edad:number)
    {
        this.correo = correo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

}
