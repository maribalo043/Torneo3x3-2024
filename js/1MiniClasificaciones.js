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
var Microbios = new Equipo("Microbios");
var Sticks = new Equipo("Sticks Fighters");
var Fantasticos = new Equipo("Los 4 Fantásticos");
var Ruedas = new Equipo("Con Ruedas y a lo Loco");
var Elfos = new Equipo("Los Elfos del Telecable");
var Guerreros = new Equipo("Los Guerreros KPOP (M)");

// Crear instancias de partidos después de crear instancias de equipos
/*Partidos VIERNES 27 Diciembre*/
var partido11 = new Partido(Microbios,Guerreros, '',"11:30-12:00","Pista Sara Roces"); 
var partido12 = new Partido(Sticks,Elfos,'9-6',"11:30-12:00","Pista Marta Piquero");
var partido13 = new Partido(Fantasticos,Ruedas,'20-0',"13:00-13:30","Pista Marta Piquero"); 

var partido14 = new Partido(Sticks,Fantasticos,null,"14:30-15:00","Pista Sara Roces"); 
var partido15 = new Partido(Guerreros,Ruedas,null,"14:30-15:00","Pista Marta Piquero");
var partido16 = new Partido(Elfos,Microbios,null,"14:30-15:00","Pista Sergio Villar");

var partido17 = new Partido(Microbios,Ruedas,null,"16:30-17:00","Pista Sara Roces");
var partido18 = new Partido(Elfos,Fantasticos,null,"16:30-17:00","Pista Marta Piquero");
var partido19 = new Partido(Guerreros,Sticks,null,"17:00-17:30","Pista Sara Roces");

/*Partidos SABADO 28 Diciembre*/
var partido110 = new Partido(Fantasticos,Microbios,null,"09:30-10:00","Pista Marta Piquero"); 
var partido111 = new Partido(Ruedas,Sticks,null,"10:00-10:30","Pista Marta Piquero");
var partido112 = new Partido(Elfos,Guerreros,null,"10:00-10:30","Pista Sara Roces"); 

var partido113 = new Partido(Microbios,Sticks,null,"12:30-13:00","Pista Sara Roces"); 
var partido114 = new Partido(Fantasticos,Guerreros,null,"12:30-13:00","Pista Marta Piquero");
var partido115 = new Partido(Ruedas,Elfos,null,"13:00-13:30","Pista Sergio Villar");

/*Partidos DOMINGO 29 Diciembre--------------------------------------------------------------------------------------*/
var Semi1 = new PartidoFinal(null,null,null,"16:30-17:00","Pista Sara Roces"); 
var Semi2 = new PartidoFinal(null,null,null,"16:30-17:00","Pista Marta Piquero");
var TercerCuarto = new PartidoFinal(null,null,null,"11:30-12:00","Pista Sara Roces"); 
var Final = new PartidoFinal(null,null,null,"11:30-12:00","Pista Marta Piquero"); 
/*Grupos y su ordenación*/
var ordenGrupo = [Microbios,Sticks,Fantasticos,Ruedas,Elfos,Guerreros];
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
    // VIERNES 27 DICIEMBRE (partidos 1 al 9)
    dia1: [
        partido11, partido12, partido13,partido14, partido15, partido16,partido17, partido18, partido19
    ],

    // SÁBADO 28 DICIEMBRE (partidos 10 al 15)
    dia2: [
        partido110, partido111, partido112,partido113, partido114, partido115
    ],

    // DOMINGO 29 DICIEMBRE (finales)
    dia3: [
        Semi1, Semi2,TercerCuarto, Final
    ]
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
    // Verifica si la clave 'dia' existe en partidosPorDia
    if (partidosPorDia[dia]) {
        const partidos = partidosPorDia[dia];

        grupoNombre.textContent = "Grupo Único";
        tablaClasificaciones.style.display = 'table';  // Cambiado a 'table' para ocultarla completamente si no hay datos
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
        tablaClasificaciones.style.display = 'none'; // Cambiado a 'none' para ocultar la tabla completamente
        tbodyPartidos.innerHTML = '';
        tbodyClasificacion.innerHTML = '';
    }
}

