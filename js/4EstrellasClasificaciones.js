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

/*GRUPO A----------------------------------------------------*/
var Albamakoy = new Equipo("Albamakoy");
var BlackIce = new Equipo("Black Ice");
var Getxoko = new Equipo("Getxoko Gudariak");
var Boola = new Equipo("Boola");
var Gladiators = new Equipo("Hockey Gladiators");
var Katxopo = new Equipo("Katxopo con Ruedas");
var Cuenca = new Equipo("No Hay Cuenca Buena");
/*GRUPO B----------------------------------------------------*/
var Chulis = new Equipo("Las Chulis");
var Chiquis = new Equipo("Las Chikis");
var Tortugas = new Equipo("Las Tortugas Ninja");
var Patinazos = new Equipo("Los Patinazos");
var Compostolos = new Equipo("Compostolos");
var Jotake = new Equipo("Jo Ta Ke");
var Fanj = new Equipo("FANJ");

// Crear instancias de partidos después de crear instancias de equipos
/*Partidos VIERNES 27 Diciembre*/
/*GRUPO A--------------------------------------------------------------------------------------*/
var partido11 = new Partido(Albamakoy,Gladiators,'15-2',"9:30 - 10:00","Pista 1"); 
var partido12 = new Partido(BlackIce,Cuenca,'8-3',"10:00 - 10:30","Pista 1");
var partido13 = new Partido(Getxoko,Katxopo,'7-0',"12:30 - 13:00","Pista 1");
var partido14 = new Partido(Gladiators,Boola,'1-10',"13:00 - 13:30","Pista 1");
var partido15 = new Partido(Cuenca,Albamakoy,'5-11',"15:30 - 16:00","Pista 1");
var partido16 = new Partido(Katxopo,BlackIce,'1-7',"16:00 - 16:30","Pista 1"); 
var partido17 = new Partido(Getxoko,Boola,'1-6',"18:30 - 19:00","Pista 1");
var partido18 = new Partido(Gladiators,Cuenca,'5-10',"19:00 - 19:30","Pista 1");
var partido19 = new Partido(Albamakoy,Katxopo,'3-3',"21:00 - 21:30","Pista 1");
var partido110 = new Partido(Getxoko,BlackIce,'10-2',"21:30 - 22:00","Pista 1");
/*GRUPO B--------------------------------------------------------------------------------------*/
var partido21 = new Partido(Chulis,Tortugas,'8-2',"9:30 - 10:00","Pista 2"); 
var partido22 = new Partido(Patinazos,Chiquis,'2-9',"10:00 - 10:30","Pista 2");
var partido23 = new Partido(Tortugas,Fanj,'2-9',"12:30 - 13:00","Pista 2");
var partido24 = new Partido(Compostolos,Patinazos,'10-0',"13:00 - 13:30","Pista 2");
var partido25 = new Partido(Jotake,Chulis,'2-16',"15:30 - 16:00","Pista 2");
var partido26 = new Partido(Fanj,Chiquis,'1-8',"16:00 - 16:30","Pista 2"); 
var partido27 = new Partido(Tortugas,Patinazos,'5-7',"18:30 - 19:00","Pista 2");
var partido28 = new Partido(Compostolos,Jotake,'9-0',"19:00 - 19:30","Pista 2");
var partido29 = new Partido(Chulis,Fanj,'1-1',"21:00 - 21:30","Pista 2");
var partido210 = new Partido(Chiquis,Tortugas,'8-1',"21:30 - 22:00","Pista 2");
/*Partidos SABADO 28 Diciembre*/
/*GRUPO A--------------------------------------------------------------------------------------*/
var partido111 = new Partido(Cuenca,Boola,'2-10',"9:00 - 9:30","Pista 1"); 
var partido112 = new Partido(Katxopo,Gladiators,'1-3',"9:30 - 10:00","Pista 1");
var partido113 = new Partido(Albamakoy,Getxoko,'7-10',"10:30 - 11:00","Pista 1");
var partido114 = new Partido(Cuenca,Katxopo,'5-5',"11:00 - 11:30","Pista 1");
var partido115 = new Partido(Boola,BlackIce,'11-0',"14:00 - 14:30","Pista 1");
var partido116 = new Partido(Getxoko,Gladiators,'12-2',"14:30 - 15:00","Pista 1"); 
var partido117 = new Partido(Boola,Katxopo,'8-0',"16:30 - 17:00","Pista 1");
var partido118 = new Partido(BlackIce,Albamakoy,'1-9',"17:00 - 17:30","Pista 1");
var partido119 = new Partido(Cuenca,Getxoko,null,"18:30 - 19:00","Pista 1");
var partido120 = new Partido(Gladiators,BlackIce,null,"19:00 - 19:30","Pista 1");
var partido121 = new Partido(Albamakoy,Boola,null,"21:30 - 22:00","Pista 1");
/*GRUPO B--------------------------------------------------------------------------------------*/
var partido211 = new Partido(Jotake,Patinazos,'1-10',"9:00 - 9:30","Pista 2"); 
var partido212 = new Partido(Fanj,Compostolos,'0-3',"9:30 - 10:00","Pista 2");
var partido213 = new Partido(Chulis,Compostolos,'1-7',"10:30 - 11:00","Pista 2");
var partido214 = new Partido(Chiquis,Jotake,'8-1',"11:00 - 11:30","Pista 2");
var partido215 = new Partido(Jotake,Fanj,'2-8',"14:00 - 14:30","Pista 2");
var partido216 = new Partido(Tortugas,Compostolos,'0-4',"14:30 - 15:00","Pista 2"); 
var partido217 = new Partido(Patinazos,Fanj,'5-6',"16:30 - 17:00","Pista 2");
var partido218 = new Partido(Chiquis,Chulis,'3-0',"17:00 - 17:30","Pista 2");
var partido219 = new Partido(Jotake,Tortugas,null,"18:30 - 19:00","Pista 2");
var partido220 = new Partido(Compostolos,Chiquis,null,"19:00 - 19:30","Pista 2");
var partido221 = new Partido(Chulis,Patinazos,null,"21:30 - 22:00","Pista 2");
/*Finales DOMINGO 29 Diciembre--------------------------------------------------------------------------------------*/
var partidoSemi1 = new PartidoFinal('Semifinal 1ºA', 'Semifinal 2ºB',null, 'Semifinal: 11:30 - 12:00','Pista 1');
var partidoSemi2 = new PartidoFinal('Semifinal 2ºA', 'Semifinal 1ºB',null, 'Semifinal: 11:30 - 12:00','Pista 2');
var tercerCuarto = new PartidoFinal('unthefined','unthefined',null, 'Tercer y Cuarto: 13:30 - 14:00','Pista 2');
var partidoFinal = new PartidoFinal('unthefined','unthefined',null, 'Final: 13:30 - 14:00','Pista 1');


var ordenGrupo1 = [Albamakoy, BlackIce ,Getxoko, Boola, Gladiators, Katxopo, Cuenca];
var ordenGrupo2 = [Chulis, Chiquis, Tortugas, Patinazos, Compostolos, Jotake, Fanj];
// Ordenar grupos después de actualizar resultados
ordenarGrupos(ordenGrupo1);
ordenarGrupos(ordenGrupo2);

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
        grupo1: {
            dia1: [partido11, partido12, partido13, partido14, partido15, partido16, partido17, partido18,partido19,partido110],
            dia2: [partido111, partido112, partido113, partido114, partido115, partido116, partido117, partido118, partido119,partido120, partido121],
        },
        grupo2: {
            dia1: [partido21,partido22,partido23,partido24,partido25,partido26,partido27,partido28,partido29,partido210],
            dia2: [partido211, partido212, partido213, partido214, partido215, partido216, partido217, partido218, partido219,partido220, partido221],
        },
        finales: {
            dia1: [partidoSemi1, partidoSemi2,tercerCuarto,partidoFinal],
        },
    };

    // Mapear datos de clasificación
    const clasificacionPorGrupo = {
        grupo1: ordenGrupo1,
        grupo2: ordenGrupo2,
    };

    // Función para rellenar partidos
    const llenarPartidos = (partidos) => {
        tbodyPartidos.innerHTML = '';
        partidos.forEach(partido => {
            const fila = tbodyPartidos.insertRow();
            const datos = [
                partido.equipo1.nombre,
                partido.resultado || 'Sin jugar',
                partido.equipo2.nombre,
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
            grupoNombre.textContent = `Grupo ${grupo === "grupo1" ? "A" : "B"}`;
            tablaClasificaciones.style.visibility = 'visible';
            tituloClasif.textContent = `Clasificación Grupo ${grupo === "grupo1" ? "A" : "B"}`;

            const partidos = partidosPorDia[grupo]?.[dia] || [];
            llenarPartidos(partidos);

            const clasificacion = clasificacionPorGrupo[grupo] || [];
            llenarClasificacion(clasificacion);
            break;

        case "finales":
            grupoNombre.textContent = "Finales";
            tablaClasificaciones.style.visibility = 'hidden';
            tituloClasif.textContent = "Premios a las 14:30";

            const partidosFinales = partidosPorDia.finales?.[dia] || [];
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
