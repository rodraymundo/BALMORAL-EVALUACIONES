let paginaActual = 1;
const totalPaginas = 4;

let botonActivo = null;

//PARA SABER QUE BOTON DE EVALUAR SE PRESIONO Y PODER QUITARLO UNA VEZ QUE LA EVALUACION SE HAYA REALIZADO
document.querySelectorAll('.evaluar-btn').forEach(btn => {//LE AGREGA A TODOS LOS BOTONES EL EVENTO 
    btn.addEventListener('click', (e) => {//CUANDO SE PRESIONA EL BOTON
        botonActivo = e.currentTarget;//DECLARA LA REFERENCIA DEL BOTON QUE SE PRESIONO COMO "botonActivo"
        const modal = new bootstrap.Modal(document.getElementById('modalEvaluacionProfesor'));
        mostrarPagina(1);//PARA MOSTRAR LA PRIMER PAGINA Y QUE NO SE MUESTRE LA PAGINA ACTUAL PUES ESTA SE PUEDE QUEDAR GUARDADA COMO 4 AL REALIZAR OTRA EVALUACION ANTES
        paginaActual=1;//PARA QUE EL NUMERO DE PAGINA SE REINICIE CADA VEZ QUE SE ABRA UN MODAL
        modal.show();
    });
});


//FUNCION PARA MOSTRAR LA PAGINA DEPENDIENDO DE EN CUAL SE ENCUENTRE ANTERIORMENTE
function mostrarPagina(pagina) {
    for (let i = 1; i <= totalPaginas; i++) {
        document.getElementById('pagina-' + i).classList.add('d-none'); //QUITAR TODAS LAS PAGINAS AL INICIO 
    }

    document.getElementById('pagina-' + pagina).classList.remove('d-none');

    document.getElementById('btnAtras').style.display = (pagina === 1) ? 'none' : 'inline-block';
    document.getElementById('btnSiguiente').style.display = (pagina === totalPaginas) ? 'none' : 'inline-block';
}


//BOTON DE SIGUIENTE
document.getElementById('btnSiguiente').addEventListener('click', () => {
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarPagina(paginaActual);
    }
});

//BOTON DE ATRAS
document.getElementById('btnAtras').addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarPagina(paginaActual);
    }
});

//BOTON DE TERMINAR EVALUACION
document.getElementById('btnFinalizar').addEventListener('click', () => {
    alert('Evaluación finalizada. Gracias por su participación.');
    // CERRAR EL MODAL
    const modalElement = document.getElementById('modalEvaluacionProfesor');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    //QUITAR BOTON DE EVALUAR Y PONER TEXTO 
    botonID = botonActivo.id;
    document.getElementById(botonID).classList.add('d-none')
    document.getElementById(botonID + '-txt').classList.remove('d-none')

    botonActivo = null;
});

// SE INICIA EN LA PAGINA 1
mostrarPagina(1);