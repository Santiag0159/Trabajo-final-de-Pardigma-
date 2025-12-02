//Uso de Programacion Orientada a Objetos

import { validarTareaCompleta, datosTarea, resultadoValidacion, exitoValidacion, errorValidacion, estado, dificultad } from '../validaciones/Validaciones';
export type Estado = 'pendiente'|'en_curso'|'terminada'|'eliminada'
export type Dificultad = 'facil'|'media'|'dificil'

export class Tarea{
    private _id: number;
    private _titulo: string;
    private _descripcion: string;
    private _estado: Estado;
    private _dificultad: Dificultad;
    private _fechaCreacion: Date;
    private _fechaEdicion: Date;
    
    //Constructor
    constructor (titulo: string, descripcion: string, estado: Estado, dificultad: Dificultad){
        this._id = Date.now();
        this._titulo = titulo;
        this._descripcion = descripcion;
        this._estado = estado;
        this._dificultad = dificultad;
        this._fechaCreacion = new Date();
        this._fechaEdicion = new Date();
    }
    
    
    get titulo(): string{
        return this._titulo;
    }
    
    set titulo(titulo: string) {
        this._titulo = titulo;
    }
    
    get descripcion(): string | null {
        return this._descripcion;
    }
    
    set descripcion(descripcion: string) {
        this._descripcion = descripcion;
    }
    
    get estado(): Estado {
        return this._estado;
    }
    
    set estado(estado: Estado) {
        this._estado = estado;
    }
    
    get dificultad(): Dificultad {
        return this._dificultad;
    }
    
    set dificultad(dificultad: Dificultad) {
        this._dificultad = dificultad;
    }
    
    get fechaCreacion(): Date {
        return this._fechaCreacion;
    }
    
    get fechaEdicion(): Date {
        return this._fechaEdicion;
    }

    static crearConValidaciones(datos: datosTarea): resultadoValidacion | { tipo: 'creada'; tarea: Tarea } {
        const validacion = validarTareaCompleta(datos);

        if (validacion.tipo === 'error') {
            return {
                tipo: 'error',
                campo: validacion.campo,
                mensaje: validacion.mensaje,
                valorIngresado: validacion.valorIngresado
            };
        }

        const nuevaTarea = new Tarea(
            validacion.titulo,
            validacion.descripcion,
            validacion.estado as Estado,
            validacion.dificultad as Dificultad
        );

        return {
            tipo: 'creada',
            tarea: nuevaTarea
        };
    }
}