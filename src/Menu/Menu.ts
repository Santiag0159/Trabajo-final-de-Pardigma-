import { entrada} from "../Funciones/Funciones";
import { agregarTarea,verTarea,buscarTarea,eliminarTarea } from "../Funciones/FuncionesTareas";
export function Menu(){
 console.log(' Gestor de tarea ');
 console.log('1 Agregar tarea ');
 console.log('2 Ver tarea');
 console.log('3 Buscar tarea');
 console.log('4 Eliminar tarea');
 console.log('0 Salir ');
 const opcion: string = entrada('Seleccione una opcion: ');
 switch (opcion){
    case '1':
        agregarTarea();
        break;
    case '2':
        verTarea();
        break;
    case '3':
        buscarTarea();
        break;
    case '4':
        eliminarTarea();
        break;
    case '0':
        console.clear();
        console.log('Saliendo de la aplicacion...');
        process.exit(0);
        break;
    default: 
        console.clear();    
        console.log(`Su opcion: "${opcion}". Intente de nuevo.`);
        Menu();
        break;
 }
}