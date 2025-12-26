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
var Chopos = new Equipo("Los Chopos");
var Patin = new Equipo("Ni Patín Ni Pa Mi");
var Carniceras = new Equipo("Las Carniceras");
var Bartolos = new Equipo("Los Bartolos");
var Ventolines = new Equipo("Ventolines");
var Cantabrucos = new Equipo("Cantabrucos");

/*GRUPO B----------------------------------------------------*/
var Colorinchis = new Equipo("Colorinchis");
var Calamares = new Equipo("Calamares en oferta");
var Vascos = new Equipo("Varserkexe Team");
var Devasting = new Equipo("Devasting Players");
var Picapiedra = new Equipo("Los Picapiedra");
var Celtic = new Equipo("Celtic");


// Crear instancias de partidos después de crear instancias de equipos
/*Partidos VIERNES 27 Diciembre*/
// GRUPO A - VIERNES

var partidoA1 = new Partido(Chopos, Patin, "8-0", "10:00-10:30", "Pista Sara Roces");
var partidoA2 = new Partido(Carniceras, Bartolos,null, "10:00-10:30", "Pista Marta Piquero");
var partidoA3 = new Partido(Patin, Carniceras, null, "12:30-13:00", "Pista Sergio Villar");
var partidoA4 = new Partido(Bartolos, Cantabrucos, null, "13:00-13:30", "Pista Sara Roces");
var partidoA5 = new Partido(Cantabrucos, Ventolines, null, "14:30-15:00", "Pista Sara Roces");
var partidoA6 = new Partido(Carniceras, Ventolines, null, "15:30-16:00", "Pista Sara Roces");
var partidoA7 = new Partido(Chopos, Bartolos, null, "15:30-16:00", "Pista Patinalon");
var partidoA8 = new Partido(Cantabrucos, Chopos, null, "18:00-18:30", "Pista Sara Roces");
var partidoA9 = new Partido(Ventolines, Patin, null, "19:00-19:30", "Pista Sara Roces");
var partidoA10 = new Partido(Chopos, Carniceras, null, "20:30-21:00", "Pista Marta Piquero");
var partidoA11 = new Partido(Bartolos, Ventolines, null, "21:00-21:30", "Pista Sara Roces");

/*GRUPO B--------------------------------------------------------------------------------------*/
var partidoB1 = new Partido(Colorinchis, Calamares, "5-5", "12:30-13:00", "Pista Sara Roces");
var partidoB2 = new Partido(Picapiedra, Celtic, null, "12:30-13:00", "Pista Marta Piquero");
var partidoB3 = new Partido(Vascos, Devasting, null, "12:30-13:00", "Pista Patinalon");
var partidoB4 = new Partido(Celtic, Vascos, null, "15:30-16:00", "Pista Sara Roces");
var partidoB5 = new Partido(Calamares, Devasting, null, "15:30-16:00", "Pista Patinalon");
var partidoB6 = new Partido(Calamares, Picapiedra, null, "16:00-16:30", "Pista Sara Roces");
var partidoB7 = new Partido(Colorinchis, Vascos, null, "18:00-18:30", "Pista Patinalon");
var partidoB8 = new Partido(Devasting, Picapiedra, null, "18:30-19:00", "Pista Sara Roces");
var partidoB9 = new Partido(Celtic, Calamares, null, "18:30-19:00", "Pista Patinalon");
var partidoB10 = new Partido(Colorinchis, Devasting, null, "21:00-21:30", "Pista Sara Roces");

/*Partidos SABADO 28 Diciembre*/
/*GRUPO A--------------------------------------------------------------------------------------*/
// Partidos Grupo A - Sábado
var partidoA_sab1 = new Partido(Ventolines, Chopos, null, "11:00-11:30", "Pista Sara Roces");
var partidoA_sab2 = new Partido(Patin, Cantabrucos, null, "11:00-11:30", "Pista Marta Piquero");
var partidoA_sab3 = new Partido(Patin, Bartolos, null, "13:30-14:00", "Pista Patinalon");
var partidoA_sab4 = new Partido(Carniceras, Cantabrucos, null, "13:30-14:00", "Pista Patinalon");

// Partidos Grupo B - Sábado
var partidoB_sab1 = new Partido(Colorinchis, Picapiedra, null, "10:30-11:00", "Pista Sara Roces");
var partidoB_sab2 = new Partido(Devasting, Celtic, null, "10:30-11:00", "Pista Marta Piquero");
var partidoB_sab3 = new Partido(Vascos, Calamares, null, "11:00-11:30", "Pista Sara Roces");
var partidoB_sab4 = new Partido(Celtic, Colorinchis, null, "12:30-13:00", "Pista Patinalon");
var partidoB_sab5 = new Partido(Picapiedra, Vascos, null, "13:30-14:00", "Pista Patinalon");

/*Finales DOMINGO 29 Diciembre--------------------------------------------------------------------------------------*/

var Cuarto1 = new PartidoFinal(null,null,null,"Sábado Cuarto 1: 18:30-19:00","Pista Sara Roces"); 
var Cuarto2 = new PartidoFinal(null,null,null,"Sábado Cuarto 2: 18:30-19:00","Pista Marta Piquero");
var Cuarto3 = new PartidoFinal(null,null,null,"Sábado Cuarto 3: 19:00-19:30","Pista Sara Roces"); 
var Cuarto4 = new PartidoFinal(null,null,null,"Sábado Cuarto 4: 19:00-19:30","Pista Marta Piquero");
var Semi1 = new PartidoFinal(null,null,null,"Semi 1: 10:00-10:30","Pista Sara Roces"); 
var Semi2 = new PartidoFinal(null,null,null,"Semi 2: 10:00-10:30","Pista Marta Piquero");
var TercerCuarto = new PartidoFinal(null,null,null," TercerCuarto: 12:30-13:00","Pista Sara Roces");
var Final = new PartidoFinal(null,null,null,"Final: 12:30-13:00","Pista Marta Piquero");

var ordenGrupo1 = [Chopos,Patin,Carniceras,Celtic,Cantabrucos,Ventolines,Devasting];
var ordenGrupo2 = [Colorinchis,Bartolos,Calamares,Picapiedra,Vascos,Cachopas];
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
            dia1: [partidoA1, partidoA2, partidoA3, partidoA4, partidoA5, partidoA6, partidoA7, partidoA8, partidoA9, partidoA10, partidoA11],
            dia2: [partidoA_sab1, partidoA_sab2, partidoA_sab3, partidoA_sab4],
        },
        grupo2: {
            dia1: [partidoB1, partidoB2, partidoB3, partidoB4, partidoB5, partidoB6, partidoB7, partidoB8, partidoB9, partidoB10],
            dia2: [partidoB_sab1, partidoB_sab2, partidoB_sab3, partidoB_sab4, partidoB_sab5],
        },
        finales: {
            finales: [Cuarto1,Cuarto2,Cuarto3,Cuarto4,Semi1, Semi2, TercerCuarto, Final],
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
                tituloClasif.textContent = "Premios a las 14:00"; // Configura el subtítulo
            
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
