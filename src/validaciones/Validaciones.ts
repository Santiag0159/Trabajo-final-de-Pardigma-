export interface exitoValidacion {
    tipo: 'exito';
    titulo: string;
    descripcion: string;
    estado: estado;
    dificultad: dificultad;
}


export interface errorValidacion {
    tipo: 'error';
    campo: string;
    mensaje: string;
    valorIngresado?: any;
}


export type resultadoValidacion = exitoValidacion | errorValidacion;

export interface validacionTexto {
    tipo: 'exito' | 'error';
    dato?: string;
    campo?: string;
    mensaje?: string;
    valorIngresado?: any;
}


export interface validacionEstado {
    tipo: 'exito' | 'error';
    dato?: estado;
    campo?: string;
    mensaje?: string;
    valorIngresado?: any;
}


export interface validacionDificultad {
    tipo: 'exito' | 'error';
    dato?: dificultad;
    campo?: string;
    mensaje?: string;
    valorIngresado?: any;
}


export type estado = 'pendiente' | 'en curso' | 'terminada' | 'eliminada';
export type dificultad = 'facil' | 'media' | 'dificil';


export interface datosTarea {
    titulo: string;
    descripcion: string;
    estado: string;
    dificultad: string;
}


export interface tareasValidadas {
    titulo: string;
    descripcion: string;
    estado: estado;
    dificultad: dificultad;
}

function validarTextoNoVacio(texto: string, nombreDelCampo: string): validacionTexto {
    if (typeof texto !== 'string') {
        return {
            tipo: 'error',
            campo: nombreDelCampo,
            mensaje: `${nombreDelCampo} debe ser texto`,
            valorIngresado: texto
        };
    }

    const textoLimpio = texto.trim();

    if (textoLimpio === '') {
        return {
            tipo: 'error',
            campo: nombreDelCampo,
            mensaje: `${nombreDelCampo} no puede estar vacío`,
            valorIngresado: texto
        };
    }

    return {
        tipo: 'exito',
        dato: textoLimpio
    };
}

function validarLongitudMinima(texto: string, minimo: number, nombreDelCampo: string): validacionTexto {
    if (texto.length < minimo) {
        return {
            tipo: 'error',
            campo: nombreDelCampo,
            mensaje: `${nombreDelCampo} debe tener al menos ${minimo} caracteres (escribiste ${texto.length})`,
            valorIngresado: texto
        };
    }

    return {
        tipo: 'exito',
        dato: texto
    };
}


function validarLongitudMaxima(texto: string, maximo: number, nombreDelCampo: string): validacionTexto {
    if (texto.length > maximo) {
        return {
            tipo: 'error',
            campo: nombreDelCampo,
            mensaje: `${nombreDelCampo} no puede superar ${maximo} caracteres (escribiste ${texto.length})`,
            valorIngresado: texto
        };
    }

    return {
        tipo: 'exito',
        dato: texto
    };
}

function validarEstadoEsValido( estadoIngresado: string): validacionEstado {
    const estadosValidos: estado[] = ['pendiente', 'en curso', 'terminada', 'eliminada'];
    const estadoNormalizado = estadoIngresado.toLowerCase().trim();

    if (!estadosValidos.includes(estadoNormalizado as estado)) {
        return {
            tipo: 'error',
            campo: 'estado',
            mensaje: `Estado no válido. Opciones válidas: ${estadosValidos.join(', ')}`,
            valorIngresado: estadoIngresado
        };
    }

    return {
        tipo: 'exito',
        dato: estadoNormalizado as estado
    };
}


function validarDificultadEsValida( dificultadIngresada: string): validacionDificultad {
    const dificultadesValidas: dificultad[] = ['facil', 'media', 'dificil'];
    const dificultadNormalizada = dificultadIngresada.toLowerCase().trim();

    if (!dificultadesValidas.includes(dificultadNormalizada as dificultad)) {
        return {
            tipo: 'error',
            campo: 'dificultad',
            mensaje: `Dificultad no válida. Opciones válidas: ${dificultadesValidas.join(', ')}`,
            valorIngresado: dificultadIngresada
        };
    }

    return {
        tipo: 'exito',
        dato: dificultadNormalizada as dificultad
    };
}

export function validarTareaCompleta( datos: datosTarea): resultadoValidacion {
    const validarTitulo = validarTextoNoVacio(datos.titulo, 'Título');
    if (validarTitulo.tipo === 'error') {
        return {
            tipo: 'error',
            campo: validarTitulo.campo || 'Título',
            mensaje: validarTitulo.mensaje || 'Error en título',
            valorIngresado: validarTitulo.valorIngresado
        };
    }

    const validarTituloMinimo = validarLongitudMinima(validarTitulo.dato || '', 3, 'Título');
    if (validarTituloMinimo.tipo === 'error') {
        return {
            tipo: 'error',
            campo: validarTituloMinimo.campo || 'Título',
            mensaje: validarTituloMinimo.mensaje || 'Error en título',
            valorIngresado: validarTituloMinimo.valorIngresado
        };
    }

    const validarTituloMaximo = validarLongitudMaxima(validarTitulo.dato || '', 100, 'Título');
    if (validarTituloMaximo.tipo === 'error') {
        return {
            tipo: 'error',
            campo: validarTituloMaximo.campo || 'Título',
            mensaje: validarTituloMaximo.mensaje || 'Error en título',
            valorIngresado: validarTituloMaximo.valorIngresado
        };
    }

    const tituloValidado = validarTitulo.dato || '';

    const validarDescripcion = validarTextoNoVacio(datos.descripcion, 'Descripción');
    if (validarDescripcion.tipo === 'error') {
        return {
            tipo: 'error',
            campo: validarDescripcion.campo || 'Descripción',
            mensaje: validarDescripcion.mensaje || 'Error en descripción',
            valorIngresado: validarDescripcion.valorIngresado
        };
    }

    const validarDescripcionMinima = validarLongitudMinima(validarDescripcion.dato || '', 5, 'Descripción');
    if (validarDescripcionMinima.tipo === 'error') {
        return {
            tipo: 'error',
            campo: validarDescripcionMinima.campo || 'Descripción',
            mensaje: validarDescripcionMinima.mensaje || 'Error en descripción',
            valorIngresado: validarDescripcionMinima.valorIngresado
        };
    }

    const validarDescripcionMaxima = validarLongitudMaxima(validarDescripcion.dato || '', 500, 'Descripción');
    if (validarDescripcionMaxima.tipo === 'error') {
        return {
            tipo: 'error',
            campo: validarDescripcionMaxima.campo || 'Descripción',
            mensaje: validarDescripcionMaxima.mensaje || 'Error en descripción',
            valorIngresado: validarDescripcionMaxima.valorIngresado
        };
    }

    const descripcionValidada = validarDescripcion.dato || '';

    const validarEstado = validarEstadoEsValido(datos.estado);
    if (validarEstado.tipo === 'error') {
        return {
            tipo: 'error',
            campo: validarEstado.campo || 'Estado',
            mensaje: validarEstado.mensaje || 'Error en estado',
            valorIngresado: validarEstado.valorIngresado
        };
    }

    const estadoValidado = validarEstado.dato as estado;


    const validarDificultad = validarDificultadEsValida(datos.dificultad);
    if (validarDificultad.tipo === 'error') {
        return {
            tipo: 'error',
            campo: validarDificultad.campo || 'Dificultad',
            mensaje: validarDificultad.mensaje || 'Error en dificultad',
            valorIngresado: validarDificultad.valorIngresado
        };
    }

    const dificultadValidada = validarDificultad.dato as dificultad;

    return {
        tipo: 'exito',
        titulo: tituloValidado,
        descripcion: descripcionValidada,
        estado: estadoValidado,
        dificultad: dificultadValidada
    };
}