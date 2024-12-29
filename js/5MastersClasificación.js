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
var Corredoria = new Equipo("Corredoria");
var Galacticos = new Equipo("Los Galácticos de Montepinar");
var Parrales = new Equipo("Hueverías Parrales");
var Supernenas = new Equipo("Las Supernenas");
var Calientabanquillos = new Equipo("Los CalientaBanquillos");
/*GRUPO B----------------------------------------------------*/
var Merli = new Equipo("Merli y los Merlas");
var NDHL = new Equipo("NDHL");
var Getxokolate = new Equipo("Getxokolate");
var Caleyo = new Equipo("El Caleyo");
var Nalgon = new Equipo("Patín Nalgón");
var Fallen = new Equipo("The Fallen");

// Crear instancias de partidos después de crear instancias de equipos
/*Partidos VIERNES 27 Diciembre*/
/*GRUPO A--------------------------------------------------------------------------------------*/
var partido11 = new Partido(Corredoria,Supernenas,'3-1',"9:00 - 9:30","Pista 1"); 
var partido12 = new Partido(Galacticos,Calientabanquillos,'2-4',"11:30 - 12:00","Pista 1");
var partido13 = new Partido(Supernenas,Parrales,'4-4',"15:00 - 15:30","Pista 1");
var partido14 = new Partido(Calientabanquillos,Corredoria,'3-9',"18:00 - 18:30","Pista 1");
var partido15 = new Partido(Parrales,Galacticos,'2-2',"20:30 - 21:00","Pista 1");
/*GRUPO B--------------------------------------------------------------------------------------*/
var partido21 = new Partido(Merli,Nalgon,'7-5',"9:00 - 9:30","Pista 2");
var partido22 = new Partido(Merli,Caleyo,'5-6',"11:00 - 11:30","Pista 2");
var partido23 = new Partido(NDHL,Fallen,'1-6',"11:30 - 12:00","Pista 2"); 
var partido24 = new Partido(Nalgon,NDHL,'12-2',"14:30 - 15:00","Pista 2");
var partido25 = new Partido(Caleyo,Getxokolate,'8-4',"15:00 - 15:30","Pista 2");
var partido26 = new Partido(NDHL,Merli,'6-7',"17:30 - 18:00","Pista 2");
var partido27 = new Partido(Nalgon,Fallen,'6-8',"18:00 - 18:30","Pista 2");
var partido28 = new Partido(Getxokolate,NDHL,'5-6',"20:30 - 21:00","Pista 2");

/*Partidos SABADO 28 Diciembre*/
/*GRUPO A--------------------------------------------------------------------------------------*/
var partido16 = new Partido(Parrales,Calientabanquillos,'7-3',"11:00 - 11:30","Pista 1"); 
var partido17 = new Partido(Supernenas,Galacticos,'2-3',"12:00 - 12:30","Pista 1");
var partido18 = new Partido(Corredoria,Parrales,'1-7',"15:00 - 15:30","Pista 1");
var partido19 = new Partido(Supernenas,Calientabanquillos,'13-4',"20:30 - 21:00","Pista 1");
var partido110 = new Partido(Galacticos,Corredoria,'2-5',"21:00 - 21:30","Pista 1");
/*GRUPO B--------------------------------------------------------------------------------------*/
var partido29 = new Partido(Caleyo, NDHL,'5-2',"11:30 - 12:00","Pista 2");
var partido210 = new Partido(Merli,Getxokolate,'9-7',"12:00 - 12:30","Pista 2");
var partido211 = new Partido(Fallen,Getxokolate,'8-6',"13:30 - 14:00","Pista 2"); 
var partido212 = new Partido(Getxokolate,Nalgon,'6-8',"15:00 - 15:30","Pista 2");
var partido213 = new Partido(Fallen,Caleyo,'4-4',"16:00 - 16:30","Pista 2");
var partido214 = new Partido(Caleyo,Nalgon,'8-6',"20:30 - 21:00","Pista 2");
var partido215 = new Partido(Fallen,Merli,'5-2',"21:00 - 21:30","Pista 2");
/*Finales DOMINGO 29 Diciembre--------------------------------------------------------------------------------------*/
var partidoSemi1 = new PartidoFinal(Corredoria, Caleyo,'3-2', 'Semifinal: 12:00 - 12:30','Pista 1');
var partidoSemi2 = new PartidoFinal(Fallen, Parrales,'6-5', 'Semifinal: 12:00 - 12:30','Pista 2');
var tercerCuarto = new PartidoFinal(Parrales,Caleyo,'4-2', 'Tercer y Cuarto: 14:00 - 14:30','Pista 2');
var partidoFinal = new PartidoFinal(Corredoria,Fallen,'6-3', 'Final: 14:00 - 14:30','Pista 1');


var ordenGrupo1 = [Corredoria,Galacticos,Calientabanquillos,Parrales,Supernenas];
var ordenGrupo2 = [NDHL,Nalgon,Fallen,Getxokolate,Caleyo,Merli];
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
            dia1: [partido11, partido12, partido13, partido14, partido15],
            dia2: [partido16, partido17, partido18, partido19, partido110],
        },
        grupo2: {
            dia1: [partido21,partido22,partido23,partido24,partido25,partido26,partido27,partido28],
            dia2: [partido29,partido210,partido211,partido212,partido213,partido214,partido215],
        },
        finales: {
            finales: [partidoSemi1, partidoSemi2,tercerCuarto,partidoFinal],
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
                partido.resultado,
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
                grupoNombre.textContent = "Finales"; // Configura el título de la sección
                tablaClasificaciones.style.visibility = 'hidden'; // Oculta la tabla de clasificaciones
                tituloClasif.textContent = "Premios a las 14:30"; // Configura el subtítulo
            
                // Accede directamente a la lista de partidos de finales
                const partidosFinales = partidosPorDia.finales?.finales || []; // Asegura que se accede sin errores
                llenarPartidos(partidosFinales); // Llenar la tabla de partidos
            
                // Obtiene la clasificación general de finales
                const clasificacionFinales = clasificacionPorGrupo.finales || []; // Asegura una lista vacía si no existe
                llenarClasificacion(clasificacionFinales); // Llenar la tabla de clasificación
                break;
            

        default:
            grupoNombre.textContent = "Selecciona un grupo";
            tablaClasificaciones.style.visibility = 'hidden';
            tbodyPartidos.innerHTML = '';
            tbodyClasificacion.innerHTML = '';
            break;
    }
}
