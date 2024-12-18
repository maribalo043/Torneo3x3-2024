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

/*GRUPO 1----------------------------------------------------*/
var ElTunel = new Equipo("El Tunel");
var LosPegoyos = new Equipo("Los Pegoyos");
var Pejinucos = new Equipo("Pejinucos");
/*GRUPO 2----------------------------------------------------*/
var ColmilloLobo = new Equipo("Colmillo de Lobo");
var ElRegaton = new Equipo("El Regaton");
var SticksOro = new Equipo("Sticks de Oro");
var LasCarcobas = new Equipo("Las Cárcobas");

// Crear instancias de partidos después de crear instancias de equipos
/*Partidos 29 Diciembre*/
/*GRUPO 1--------------------------------------------------------------------------------------*/
var partido11 = new Partido(Pejinucos,ElTunel,'1-7',"11:30 - 12:00","Pista Sara Roces"); 
var partido12 = new Partido(Pejinucos,LosPegoyos,'0-9',"13:30 - 14:00","Pista Sara Roces");
var partido13 = new Partido(ElTunel,LosPegoyos,'5-10',"15:30 - 16:00","Pista Sara Roces"); 
/*GRUPO 2--------------------------------------------------------------------------------------*/
var partido21 = new Partido(ElRegaton,LasCarcobas,'8-4',"11:30 - 12:00","Pista Marta Piquero");
var partido22 = new Partido(SticksOro,ColmilloLobo,'2-10',"13:30 - 14:00","Pista Marta Piquero");
var partido23 = new Partido(ElRegaton,SticksOro,'10-2',"15:30 - 16:00","Pista Marta Piquero"); 
var partido24 = new Partido(LasCarcobas,SticksOro,'7-2',"17:30 - 18:00","Pista Marta Piquero");
var partido25 = new Partido(LasCarcobas,ColmilloLobo,'10-4',"19:00 - 19:30","Pista Marta Piquero");
var partido26 = new Partido(ElRegaton,ColmilloLobo,'8-2',"17:30 - 18:00","Pista Sara Roces");
/*Finales--------------------------------------------------------------------------------------*/
var partidoPrimero = new PartidoFinal(Pejinucos, ColmilloLobo,'0-7', 'Quinto y Sexto: 9:30 - 10:00','Pista Sara Roces');
var partidoSemi1 = new PartidoFinal(LosPegoyos, LasCarcobas,'6-8', 'Semifinal: 10:30 - 11:00','Pista Sara Roces');
var partidoSemi2 = new PartidoFinal(ElRegaton, ElTunel,'8-0', 'Semifinal: 10:30 - 11:00','Pista Marta Piquero');
var tercerCuarto = new PartidoFinal(LosPegoyos,ElTunel,'10-7', 'Tercer y Cuarto: 12:30 - 13:00','Pista Marta Piquero');
var partidoFinal = new PartidoFinal(ElRegaton,LasCarcobas,'6-2', 'Final: 12:30 - 13:00','Pista Sara Roces');


var ordenGrupo1 = [ElTunel,LosPegoyos,Pejinucos];
var ordenGrupo2 = [ColmilloLobo,ElRegaton,SticksOro,LasCarcobas];
// Ordenar grupos después de actualizar resultados
ordenarGrupos(ordenGrupo1);
ordenarGrupos(ordenGrupo2);
function mostrarTablas() {
    var grupo = document.getElementById('select-grupo').value;
    var grupoNombre = document.getElementById('nombreGrupo');
    var tablaClasificaciones = document.getElementById('tablaClasificacion');
    var tbodyPartidos = document.getElementById('cuerpoGrupo');
    var tbodyClasificacion = document.getElementById('cuerpoClasif');
    var clasificacionGrupo = document.getElementById('clasificacionGrupo');
    switch (grupo) {
        case "grupo1":
                    grupoNombre.innerHTML = "Grupo A";
                    tablaClasificaciones.style.visibility = 'visible';
                    clasificacionGrupo.innerHTML = "Clasificacion Grupo A";
                    // Datos de partidos
                    var datosPartidos = [
                        [partido11.equipo1.nombre, partido11.resultado, partido11.equipo2.nombre, partido11.hora,partido13.pista, 'No'],
                        [partido12.equipo1.nombre, partido12.resultado, partido12.equipo2.nombre, partido12.hora,partido13.pista, 'No'],
                        [partido13.equipo1.nombre, partido13.resultado, partido13.equipo2.nombre, partido13.hora,partido13.pista, 'No']
                    ];
                    tbodyPartidos.innerHTML = '';
                    datosPartidos.forEach(function (fila) {
                        var nuevaFila = tbodyPartidos.insertRow();
                        fila.forEach(function (dato) {
                            var celda = nuevaFila.insertCell();
                            celda.innerHTML = dato;
                        });
                    });

                    // Datos de clasificación
                    var datosClasificacion = [ 
[ordenGrupo1[0].nombre, ordenGrupo1[0].puntos, ordenGrupo1[0].golesAFavor, ordenGrupo1[0].golesEnContra, ordenGrupo1[0].partidosGanados, ordenGrupo1[0].partidosPerdidos, ordenGrupo1[0].partidosEmpatados],
[ordenGrupo1[1].nombre, ordenGrupo1[1].puntos, ordenGrupo1[1].golesAFavor, ordenGrupo1[1].golesEnContra, ordenGrupo1[1].partidosGanados, ordenGrupo1[1].partidosPerdidos, ordenGrupo1[1].partidosEmpatados],
[ordenGrupo1[2].nombre, ordenGrupo1[2].puntos, ordenGrupo1[2].golesAFavor, ordenGrupo1[2].golesEnContra, ordenGrupo1[2].partidosGanados, ordenGrupo1[2].partidosPerdidos, ordenGrupo1[2].partidosEmpatados]
                    ];
                    tbodyClasificacion.innerHTML = '';
                    datosClasificacion.forEach(function (fila) {
                        var nuevaFila = tbodyClasificacion.insertRow();
                        fila.forEach(function (dato) {
                            var celda = nuevaFila.insertCell();
                            celda.innerHTML = dato;
                        });
                    });
            break;
            case "grupo2":
                    case "29/12/2023":
                    grupoNombre.innerHTML = "Grupo B";
                    tablaClasificaciones.style.visibility = 'visible';
                    clasificacionGrupo.innerHTML = "Clasificacion Grupo B";

                    // Datos de partidos
                    var datosPartidos = [
                        [partido21.equipo1.nombre, partido21.resultado, partido21.equipo2.nombre, partido21.hora,partido21.pista,'No'],
                        [partido22.equipo1.nombre, partido22.resultado, partido22.equipo2.nombre, partido22.hora,partido22.pista,'No'],
                        [partido23.equipo1.nombre, partido23.resultado, partido23.equipo2.nombre, partido23.hora,partido23.pista,'No'],
                        [partido24.equipo1.nombre, partido24.resultado, partido24.equipo2.nombre, partido24.hora,partido24.pista,'No'],
                        [partido26.equipo1.nombre, partido26.resultado, partido26.equipo2.nombre, partido26.hora,partido26.pista,'No'],
                        [partido25.equipo1.nombre, partido25.resultado, partido25.equipo2.nombre, partido25.hora,partido25.pista,'No'],   
                    ];
                    tbodyPartidos.innerHTML = '';
                    datosPartidos.forEach(function (fila) {
                        var nuevaFila = tbodyPartidos.insertRow();
                        fila.forEach(function (dato) {
                            var celda = nuevaFila.insertCell();
                            celda.innerHTML = dato;
                        });
                    });

                    // Datos de clasificación
                    var datosClasificacion = [
                        [ordenGrupo2[0].nombre, ordenGrupo2[0].puntos, ordenGrupo2[0].golesAFavor, ordenGrupo2[0].golesEnContra, ordenGrupo2[0].partidosGanados, ordenGrupo2[0].partidosPerdidos, ordenGrupo2[0].partidosEmpatados],
                        [ordenGrupo2[1].nombre, ordenGrupo2[1].puntos, ordenGrupo2[1].golesAFavor, ordenGrupo2[1].golesEnContra, ordenGrupo2[1].partidosGanados, ordenGrupo2[1].partidosPerdidos, ordenGrupo2[1].partidosEmpatados],
                        [ordenGrupo2[2].nombre, ordenGrupo2[2].puntos, ordenGrupo2[2].golesAFavor, ordenGrupo2[2].golesEnContra, ordenGrupo2[2].partidosGanados, ordenGrupo2[2].partidosPerdidos, ordenGrupo2[2].partidosEmpatados],
                        [ordenGrupo2[3].nombre, ordenGrupo2[3].puntos, ordenGrupo2[3].golesAFavor, ordenGrupo2[3].golesEnContra, ordenGrupo2[3].partidosGanados, ordenGrupo2[3].partidosPerdidos, ordenGrupo2[3].partidosEmpatados]
                    ];
                    tbodyClasificacion.innerHTML = '';
                    datosClasificacion.forEach(function (fila) {
                        var nuevaFila = tbodyClasificacion.insertRow();
                        fila.forEach(function (dato) {
                            var celda = nuevaFila.insertCell();
                            celda.innerHTML = dato;
                        });
                    });
                    break;
            break;
            case "finales":
                        grupoNombre.innerHTML = "Finales";
                        tablaClasificaciones.style.visibility = 'hidden';
    
                        // Datos de partidos
                        var datosPartidos = [
                            [partidoPrimero.equipo1.nombre, partidoPrimero.resultado, partidoPrimero.equipo2.nombre, partidoPrimero.hora,partidoPrimero.pista, 'No'],
                            [partidoSemi1.equipo1.nombre, partidoSemi1.resultado, partidoSemi1.equipo2.nombre, partidoSemi1.hora,partidoSemi1.pista, 'No'],
                            [partidoSemi2.equipo1.nombre, partidoSemi2.resultado, partidoSemi2.equipo2.nombre, partidoSemi2.hora,partidoSemi2.pista, 'No'],
                            [tercerCuarto.equipo1.nombre, tercerCuarto.resultado, tercerCuarto.equipo2.nombre, tercerCuarto.hora,tercerCuarto.pista, 'No'],
                            [partidoFinal.equipo1.nombre, partidoFinal.resultado, partidoFinal.equipo2.nombre, partidoFinal.hora,partidoFinal.pista, 'No'],
                            ['Entrega','','De','','Premios','']
                        ];
                        tbodyPartidos.innerHTML = '';
                        datosPartidos.forEach(function (fila) {
                            var nuevaFila = tbodyPartidos.insertRow();
                            fila.forEach(function (dato) {
                                var celda = nuevaFila.insertCell();
                                celda.innerHTML = dato;
                            });
                        });
            break;
    }
}