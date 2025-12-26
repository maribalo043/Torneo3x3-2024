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
    } else {f
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
    constructor(equipo1, equipo2, resultado, hora,pista) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
        this.resultado = resultado;
        this.pista = pista;
        this.hora = hora;
        if (this.hora !== "99:99" && this.resultado!=null) {
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
var Delfines = new Equipo("Delfines en Patines");
var Kinder = new Equipo("Las Kinder Buenas");
var Sun = new Equipo("sun And Sea HC");
var Sticks = new Equipo("Los Sticks de Oro");
var Trasgos = new Equipo("Los Trasgos");
var Minions = new Equipo("Los Minions");
var Guerreros = new Equipo("Los Guerreros KPOP(G)");


// Crear instancias de partidos después de crear instancias de equipos
/*Partidos VIERNES 27 Diciembre*/
var g1 = new Partido(Delfines, Guerreros, '1-4', "12:00-12:30", "Pista Sara Roces");
var g2 = new Partido(Kinder, Minions, '3-9', "12:00-12:30", "Pista Marta Piquero");
var g3 = new Partido(Sun, Trasgos, '10-8', "12:00-12:30", "Pista Sergio Villar");

var g4 = new Partido(Sticks, Sun, '0-6', "15:00-15:30", "Pista Sara Roces");
var g5 = new Partido(Minions, Delfines, null, "15:00-15:30", "Pista Marta Piquero");
var g6 = new Partido(Guerreros, Kinder, '8-0', "15:00-15:30", "Pista Sergio Villar");

var g7 = new Partido(Kinder, Trasgos, '2-6', "17:00-17:30", "Pista Marta Piquero");
var g8 = new Partido(Minions, Guerreros, '6-6', "17:00-17:30", "Pista Sergio Villar");
var g9 = new Partido(Delfines, Sticks, '8-2', "17:00-17:30", "Pista Patinalon");

var g10 = new Partido(Trasgos, Delfines, null, "19:00-19:30", "Pista Sara Roces");
var g11 = new Partido(Guerreros, Sticks, null, "19:00-19:30", "Pista Marta Piquero");
var g12 = new Partido(Sun, Kinder, null, "19:30-20:00", "Pista Sara Roces");
/*Partidos SABADO 28 Diciembre*/
var g13 = new Partido(Minions,Sticks, null, "09:00-09:30", "Pista Sara Roces");
var g14 = new Partido(Trasgos, Guerreros, null, "09:00-09:30", "Pista Marta Piquero");
var g15 = new Partido(Delfines, Sun, null, "09:30-10:00", "Pista Sara Roces");

var g16 = new Partido(Sticks,Trasgos, null, "12:30-13:00", "Pista Patinalon");
var g17 = new Partido(Kinder, Delfines, null, "13:00-13:30", "Pista Sara Roces");
var g18 = new Partido(Sun, Minions, null, "13:00-13:30", "Pista Marta Piquero");

var g19 = new Partido(Guerreros,Sun, null, "15:00-15:30", "Pista Sergio Villar");
var g20 = new Partido(Sticks, Kinder, null, "15:00-15:30", "Pista Patinalon");
var g21 = new Partido(Trasgos, Minions, null, "15:30-16:00", "Pista Sergio Villar");

/*Finales DOMINGO 29 Diciembre--------------------------------------------------------------------------------------*/
var Semi1 = new PartidoFinal(null,null,null,"Sábado 18:00-18:30","Pista Sara Roces"); 
var Semi2 = new PartidoFinal(null,null,null,"Sábado 18:00-18:30","Pista Marta Piquero");
var TercerCuarto = new PartidoFinal(null,null,null,"12:00-12:30","Pista Sara Roces");
var Final = new PartidoFinal(null,null,null,"12:00-12:30","Pista Marta Piquero");

var ordenGrupo = [Delfines,Kinder,Sun,Sticks,Trasgos,Minions,Guerreros];
// Ordenar grupos después de actualizar resultados
ordenarGrupos(ordenGrupo);

function mostrarTablas() {
    const grupoNombre = document.getElementById('nombreGrupo');
    const dia = document.getElementById('select-dia').value;
    const tablaClasificaciones = document.getElementById('tablaClasificacion');
    const tituloClasif = document.getElementById('tituloClasificaciones');
    const tbodyPartidos = document.getElementById('cuerpoGrupo');
    const tbodyClasificacion = document.getElementById('cuerpoClasif');

    // Datos de partidos por día
    const partidosPorDia = {
        dia1: [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12],
        dia2: [g12, g14, g15, g16, g17, g18, g19, g20, g21],
        dia3: [Semi1, Semi2, TercerCuarto, Final],
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
    const llenarClasificacion = () => {
        tbodyClasificacion.innerHTML = '';
        ordenGrupo.forEach((equipo, index) => {
            const fila = tbodyClasificacion.insertRow();
            const datos = [
                index + 1,
                equipo.nombre,
                equipo.puntos,
                equipo.partidosGanados,
                equipo.partidosPerdidos,
                equipo.partidosEmpatados,
                equipo.golesAFavor,
                equipo.golesEnContra,
            ];
            datos.forEach(dato => {
                const celda = fila.insertCell();
                celda.textContent = dato;
            });
        });
    };

    // Mostrar contenido basado en el día seleccionado
    const partidos = partidosPorDia[dia] || [];
    if (partidos.length) {
        grupoNombre.textContent = "Grupo Único";
        tablaClasificaciones.style.visibility = 'visible';
        tituloClasif.textContent = "Clasificación Grupo Único";
        if(dia==='dia3'){
            tituloClasif.textContent = "Premios a las 14:00"; // Configura el subtítulo
            tbodyClasificacion.innerHTML = '';
            tablaClasificaciones.style.visibility = 'hidden';
        }
        llenarPartidos(partidos);
        llenarClasificacion();
    } else {
        grupoNombre.textContent = "Sin datos para este día";
        tablaClasificaciones.style.visibility = 'hidden';
        tbodyPartidos.innerHTML = '';
        tbodyClasificacion.innerHTML = '';
    }
}
