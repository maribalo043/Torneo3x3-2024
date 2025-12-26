function actualizarResultadosConPartido(partido) {
    var equipo1 = partido.equipo1;
    var equipo2 = partido.equipo2;
    var resultado = partido.resultado;

    var [golesEquipo1, golesEquipo2] = resultado.split('-').map(Number);

    actualizarResultados.call(equipo1, golesEquipo1, golesEquipo2, golesEquipo1 > golesEquipo2, golesEquipo1 < golesEquipo2);
    actualizarResultados.call(equipo2, golesEquipo2, golesEquipo1, golesEquipo2 > golesEquipo1, golesEquipo2 < golesEquipo1);
}

function actualizarResultados(golesAFavor, golesEnContra, ganado, perdido) {
    this.golesAFavor += golesAFavor;
    this.golesEnContra += golesEnContra;

    if (ganado) {
        this.puntos += 3;
        this.partidosGanados++;
    } else if (perdido) {
        this.partidosPerdidos++;
    } else {
        this.puntos += 1;
        this.partidosEmpatados++;
    }
}
class Equipo {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
        this.partidosGanados = 0;
        this.partidosPerdidos = 0;
        this.partidosEmpatados = 0;
        this.golesAFavor = 0;
        this.golesEnContra = 0;
    }
}
class Partido {
    constructor(equipo1, equipo2, resultado, hora, pista) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.resultado = resultado;
        this.pista = pista;
        this.hora = hora;
        if (this.hora !== "99:99" && this.resultado != null) {
            this.actualizarResultados();
        }
    }

    actualizarResultados() {
        var [golesEquipo1, golesEquipo2] = this.resultado.split('-').map(Number);
        actualizarResultados.call(this.equipo1, golesEquipo1, golesEquipo2, golesEquipo1 > golesEquipo2, golesEquipo1 < golesEquipo2);
        actualizarResultados.call(this.equipo2, golesEquipo2, golesEquipo1, golesEquipo2 > golesEquipo1, golesEquipo2 < golesEquipo1);
    }
}
class PartidoFinal {
    constructor(equipo1, equipo2, resultado, hora, pista) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.resultado = resultado;
        this.hora = hora;
        this.pista = pista;
    }
}

function ordenarGrupos(ArrayEquipos) {
    ArrayEquipos.sort((equipoA, equipoB) => {
        // Ordenar por puntos de mayor a menor
        if (equipoB.puntos !== equipoA.puntos) {
            return equipoB.puntos - equipoA.puntos;
        } else {
            // Si los puntos son iguales, ordenar por mayor diferencia de goles (a favor - en contra)
            return (equipoB.golesAFavor - equipoB.golesEnContra) - (equipoA.golesAFavor - equipoA.golesEnContra);
        }
    });
}


document.getElementById('enviar').addEventListener('click', mostrarTablas);
//window.addEventListener('load',mensajePartido);
document.addEventListener('DOMContentLoaded', startDigitalClock);
document.getElementById('enviar').addEventListener('click', actualizarPartidos);


function actualizarPartidos() {
    var table = document.getElementById('tablaGrupo');
    var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var fechaActual = new Date();
    var horaActual = fechaActual.getHours();
    var minutosActuales = fechaActual.getMinutes();

    var hora = horaActual + ':' + (minutosActuales < 10 ? '0' : '') + minutosActuales;

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var horasPartidos = cells[3].innerText.split('-');

        if (cells.length >= 6) {
            // Verifica si la hora actual está entre las dos horas del partido
            var horaInicio = parseInt(horasPartidos[0].split(':')[0]);
            var minInicio = parseInt(horasPartidos[0].split(':')[1]);
            var horaFin = parseInt(horasPartidos[1].split(':')[0]);
            var minFin = parseInt(horasPartidos[1].split(':')[1]);

            var horaActualNum = horaActual * 100 + minutosActuales;

            if (horaActualNum >= horaInicio * 100 + minInicio && horaActualNum <= horaFin * 100 + minFin) {
                // Cambia el color de fondo de toda la fila
                for (var j = 0; j < cells.length; j++) {
                    cells[j].style.backgroundColor = 'red';
                    cells[j].style.color = 'black';
                    cells[j].style.fontWeight = 'bold';
                }
            } else {
                // Restaura el color de fondo predeterminado de toda la fila
                for (var j = 0; j < cells.length; j++) {
                    cells[j].style.backgroundColor = 'white';
                    cells[j].style.color = 'black';
                    cells[j].style.fontWeight = 'none';
                }
            }
        }
    }
}
function updateDigitalClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const digitalClock = `${hours}:${minutes}:${seconds}`;
    document.getElementById('digital-clock').textContent = digitalClock;
}
function startDigitalClock() {
    updateDigitalClock();
    setInterval(updateDigitalClock, 1000);
}
function mensajePartido() {
    // Crear el párrafo
    var tipo = document.createElement("p");
    var texto = document.createTextNode("Puede que haya un retraso a la hora de subir resultados. El administrador de la página web está jugando su partido. Perdón por las molestias.");
    tipo.appendChild(texto);

    // Agregar estilos al párrafo
    tipo.style.fontWeight = "bold";
    tipo.style.textDecoration = "underline";

    // Obtener el div con la clase "container"
    var contenedor = document.querySelector('.container');

    // Obtener el h1 con la clase "titulo"
    var titulo = document.querySelector('.titulo');

    // Insertar el párrafo después del h1 dentro del div
    contenedor.insertBefore(tipo, titulo.nextSibling);
}

// Crear instancias de equipos

/*GRUPO A----------------------------------------------------*/
var Zampabollos = new Equipo("Los Zampabollos");
var Chikis = new Equipo("Las Chikis");
var Galacticas = new Equipo("Las Galácicas");
var Noclos = new Equipo("Los Ñoclos En Patines");
var Batera = new Equipo("Denok Batera");
/*GRUPO B----------------------------------------------------*/
var Cafe = new Equipo("Café Con Leche");
var Cuenca = new Equipo("Cuenca Buena");
var Krilin = new Equipo("Krilin Prime");
var Prisa = new Equipo("No Tingan Prisa");
var Jotake = new Equipo("Jo Ta Ke");
/*GRUPO C----------------------------------------------------*/
var Ruedas = new Equipo("Ruedas Sin Fronteras");
var Aurrera = new Equipo("Getxo Aurrera");
var Estrellados = new Equipo("Estrellados");
var Chikis2 = new Equipo("Las Chikis 2.0");
var Cachopas = new Equipo("Las Cachopas");
/*GRUPO D----------------------------------------------------*/
var Rayo = new Equipo("Rayo Vallacaño");
var Gudariak = new Equipo("Getxo Gudariak");
var Kiwitines = new Equipo("Kiwitines HC");
var rayos = new Equipo("Los Rayo Mcqueen");

// Crear instancias de partidos después de crear instancias de equipos
/*Partidos VIERNES 27 Diciembre*/
/*GRUPO A--------------------------------------------------------------------------------------*/
// GRUPO A - DÍA 1
var partidoA11 = new Partido(Zampabollos, Chikis, '0-7', '09:00-09:30', 'Pista Sara Roces');
var partidoA12 = new Partido(Galacticas, Noclos, '9-2', '09:00-09:30', 'Pista Marta Piquero');
var partidoA13 = new Partido(Chikis, Galacticas, '4-0', '16:00-16:30', 'Pista Sergio Villar');
var partidoA14 = new Partido(Noclos, Batera, '0-6', '16:00-16:30', 'Pista Patinalon');
var partidoA15 = new Partido(Batera, Zampabollos, null, '18:30-19:00', 'Pista Sara Roces');
var partidoA16 = new Partido(Chikis, Noclos, null, '18:30-19:00', 'Pista Marta Piquero');

/*GRUPO B--------------------------------------------------------------------------------------*/
// GRUPO B - DÍA 1
var partidoB11 = new Partido(Cafe, Cuenca,  '4-5', '09:30-10:00', 'Pista Sara Roces');
var partidoB12 = new Partido(Krilin, Prisa, '1-0', '14:00-14:30', 'Pista Marta Piquero');
var partidoB13 = new Partido(Cuenca, Jotake, null, '16:30-17:00', 'Pista Sergio Villar');
var partidoB14 = new Partido(Prisa, Cafe, null, '16:30-17:00', 'Pista Patinalon');
var partidoB15 = new Partido(Jotake, Prisa, null, '17:30-18:00', 'Pista Sergio Villar');
var partidoB16 = new Partido(Cafe, Krilin, null, '17:30-18:00', 'Pista Patinalon');
/*GRUPO C--------------------------------------------------------------------------------------*/
// GRUPO C - DÍA 1
var partidoC11 = new Partido(Ruedas, Aurrera, '4-3', '13:30-14:00', 'Pista Sara Roces');
var partidoC12 = new Partido(Chikis2, Estrellados, null, '13:30-14:00', 'Pista Marta Piquero');
var partidoC13 = new Partido(Cachopas, Ruedas, '9-1', '16:00-16:30', 'Pista Marta Piquero');
var partidoC14 = new Partido(Aurrera, Chikis2, null, '18:00-18:30', 'Pista Sara Roces');
var partidoC15 = new Partido(Estrellados, Ruedas, null, '18:00-18:30', 'Pista Marta Piquero');
var partidoC16 = new Partido(Cachopas, Aurrera, null, '19:00-19:30', 'Pista Patinalon');
/*GRUPO D--------------------------------------------------------------------------------------*/
var partidoD11 = new Partido(Kiwitines, rayos,  '0-13', "09:30-10:00", "Pista Marta Piquero");
var partidoD12 = new Partido(Rayo, Gudariak, '6-2', "14:00-14:30", "Pista Sara Roces");
var partidoD13 = new Partido(rayos, Rayo, null, "17:30-18:00", "Pista Sara Roces");
var partidoD14 = new Partido(Gudariak, Kiwitines, null, "17:30-18:00", "Pista Marta Piquero");


/*Partidos SABADO 28 Diciembre*/
/*GRUPO A--------------------------------------------------------------------------------------*/
// GRUPO A - DÍA 2
// Día 2 - Grupo A
var partidoA21 = new Partido(Noclos, Zampabollos, null, '11:30-12:00', 'Pista Patinalon');
var partidoA22 = new Partido(Galacticas, Batera, null, '12:00-12:30', 'Pista Sergio Villar');
var partidoA23 = new Partido(Zampabollos, Galacticas, null, '14:30-15:00', 'Pista Sara Roces');
var partidoA24 = new Partido(Batera, Chikis, null, '15:00-15:30', 'Pista Sara Roces');
/*GRUPO B--------------------------------------------------------------------------------------*/
// Día 2 - Grupo B
var partidoB21 = new Partido(Jotake, Krilin, null, '11:30-12:00', 'Pista Sara Roces');
var partidoB22 = new Partido(Cuenca, Prisa, null, '11:30-12:00', 'Pista Marta Piquero');
var partidoB23 = new Partido(Cafe, Jotake, null, '14:30-15:00', 'Pista Marta Piquero');
var partidoB24 = new Partido(Krilin, Cuenca, null, '15:00-15:30', 'Pista Marta Piquero');
/*GRUPO C--------------------------------------------------------------------------------------*/
// Día 2 - Grupo C
var partidoC21 = new Partido(Estrellados, Aurrera, null, '11:00-11:30', 'Pista Marta Piquero');
var partidoC22 = new Partido(Chikis2, Ruedas, null, '12:00-12:30', 'Pista Patinalon');
var partidoC23 = new Partido(Cachopas, Estrellados, null, '13:00-13:30', 'Pista Patinalon');
var partidoC24 = new Partido(Cachopas, Chikis2, null, '13:30-14:00', 'Pista Sergio Villar');

/*GRUPO D--------------------------------------------------------------------------------------*/
// Día 2 - Grupo D
var partidoD21 = new Partido(Gudariak, rayos, null, '14:30-15:00', 'Pista Sergio Villar');
var partidoD22 = new Partido(Rayo, Kiwitines, null, '14:30-15:00', 'Pista Patinalon');


/*Finales DOMINGO 29 Diciembre--------------------------------------------------------------------------------------*/
var PlayIn1 = new PartidoFinal(null,null,null,'Sábado 17:00-17:30','Pista Sara Roces');
var PlayIn2 = new PartidoFinal(null,null,null,'Sábado 17:00-17:30','Pista Marta Piquero');
var PlayIn3 = new PartidoFinal(null,null,null,'Sábado 17:30-18:00','Pista Sara Roces');
var PlayIn4 = new PartidoFinal(null,null,null,'Sábado 17:30-18:00','Pista Marta Piquero');
var Cuarto1 = new PartidoFinal(null,null,null,'Sábado 19:30-20:00','Pista Sara Roces');
var Cuarto2 = new PartidoFinal(null,null,null,'Sábado 19:30-20:00','Pista Marta Piquero');
var Cuarto3 = new PartidoFinal(null,null,null,'Sábado 20:00-20:30','Pista Sara Roces');
var Cuarto4 = new PartidoFinal(null,null,null,'Sábado 20:00-20:30','Pista Marta Piquero');
var Semi1 = new PartidoFinal(null,null,null,'10:30-11:00','Pista Sara Roces');
var Semi2 = new PartidoFinal(null,null,null,'10:30-11:00','Pista Marta Piquero');
var TercerCuarto = new PartidoFinal(null,null,null,'13:00-13:30','Pista Marta Piquero');
var Final = new PartidoFinal(null,null,null,'13:00-13:30','Pista Sara Roces');

var ordenGrupo1 = [Zampabollos, Chikis, Galacticas, Noclos, Batera];
var ordenGrupo2 = [Cafe, Cuenca, Krilin, Prisa, Jotake];
var ordenGrupo3 = [Ruedas, Aurrera, Estrellados, Chikis2, Cachopas];
var ordenGrupo4 = [Rayo, Gudariak, Kiwitines, rayos];
// Ordenar grupos después de actualizar resultados

ordenarGrupos(ordenGrupo1);
ordenarGrupos(ordenGrupo2);
ordenarGrupos(ordenGrupo3);
ordenarGrupos(ordenGrupo4);

function mostrarTablas() {
    const grupo = document.getElementById('select-grupo').value;
    const dia = document.getElementById('select-dia').value;
    const grupoNombre = document.getElementById('nombreGrupo');
    const tablaClasificaciones = document.getElementById('tablaClasificacion');
    const tituloClasif = document.getElementById('tituloClasificaciones');
    const tbodyPartidos = document.getElementById('cuerpoGrupo');
    const tbodyClasificacion = document.getElementById('cuerpoClasif');
    const clasificacionGrupo = document.getElementById('clasificacionGrupo');

    // Mapear datos de partidos
    const partidosPorDia = {
    grupo1: { // Grupo A
        dia1: [partidoA11, partidoA12, partidoA13, partidoA14, partidoA15, partidoA16],
        dia2: [partidoA21, partidoA22, partidoA23, partidoA24]
    },
    grupo2: { // Grupo B
        dia1: [partidoB11, partidoB12, partidoB13, partidoB14, partidoB15, partidoB16],
        dia2: [partidoB21, partidoB22, partidoB23, partidoB24]
    },
    grupo3: { // Grupo C
        dia1: [partidoC11, partidoC12, partidoC13, partidoC14, partidoC15, partidoC16],
        dia2: [partidoC21, partidoC22, partidoC23, partidoC24]
    },
    grupo4: { // Grupo D
        dia1: [partidoD11, partidoD12, partidoD13, partidoD14],
        dia2: [partidoD21, partidoD22]
    },
    finales: {
        finales: [PlayIn1, PlayIn2, PlayIn3, PlayIn4, Cuarto1, Cuarto2, Cuarto3, Cuarto4, Semi1, Semi2, TercerCuarto, Final]
    }
};

    // Mapear datos de clasificación
    const clasificacionPorGrupo = {
        grupo1: ordenGrupo1,
        grupo2: ordenGrupo2,
        grupo3: ordenGrupo3,
        grupo4: ordenGrupo4,
    };

    // Función para rellenar partidos
    const llenarPartidos = (partidos) => {
        tbodyPartidos.innerHTML = '';
        partidos.forEach(partido => {
            const fila = tbodyPartidos.insertRow();
            const datos = [
                partido.equipo1?.nombre || 'Sin definir',
                partido.resultado || 'Sin jugar',
                partido.equipo2?.nombre || 'Sin definir',
                partido.hora,
                partido.pista,
            ];
            datos.forEach(dato => {
                const celda = fila.insertCell();
                celda.textContent = dato;
            });
        });
    };

    // Función para rellenar clasificación
    const llenarClasificacion = (grupo) => {
        tbodyClasificacion.innerHTML = '';
        grupo.forEach((equipo, index) => {
            const fila = tbodyClasificacion.insertRow();
            const datos = [
                index + 1,
                equipo.nombre || '0',
                equipo.puntos || '0',
                equipo.partidosGanados || '0',
                equipo.partidosPerdidos || '0',
                equipo.partidosEmpatados || '0',
                equipo.golesAFavor || '0',
                equipo.golesEnContra || '0',
            ];
            datos.forEach(dato => {
                const celda = fila.insertCell();
                celda.textContent = dato;
            });
        });
    };

    // Mostrar contenido basado en el grupo seleccionado
    switch (grupo) {
        case "grupo1":
        case "grupo2":
        case "grupo3":
        case "grupo4":
            // Mapear grupo1→A, grupo2→B, grupo3→C, grupo4→D
            const letraGrupo = {
                grupo1: "A",
                grupo2: "B",
                grupo3: "C",
                grupo4: "D"
            }[grupo];

            grupoNombre.textContent = `Grupo ${letraGrupo}`;
            tablaClasificaciones.style.visibility = 'visible';
            tituloClasif.textContent = `Clasificación Grupo ${letraGrupo}`;

            // Obtener partidos y clasificación según el grupo y día
            const partidos = partidosPorDia[grupo]?.[dia] || [];
            llenarPartidos(partidos);

            const clasificacion = clasificacionPorGrupo[grupo] || [];
            llenarClasificacion(clasificacion);
            break;

        case "finales":
            grupoNombre.textContent = "Finales";
            tablaClasificaciones.style.visibility = 'hidden';
            tituloClasif.textContent = "Premios a las 14:00";

            const partidosFinales = partidosPorDia.finales?.finales || [];
            llenarPartidos(partidosFinales);

            const clasificacionFinales = clasificacionPorGrupo.finales || [];
            llenarClasificacion(clasificacionFinales);
            break;

        default:
            grupoNombre.textContent = "Selecciona un grupo";
            tablaClasificaciones.style.visibility = 'hidden';
            tbodyPartidos.innerHTML = '';
            tbodyClasificacion.innerHTML = '';
            break;
    }

}
