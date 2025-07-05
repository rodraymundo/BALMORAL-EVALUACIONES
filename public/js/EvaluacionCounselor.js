let paginaActual = 1;
const totalPaginas = 3;

btn = document.getElementById('btnEvaluar-1');

btn.addEventListener('click', (e) => {//CUANDO SE PRESIONA EL BOTON
    botonActivo = e.currentTarget;//DECLARA LA REFERENCIA DEL BOTON QUE SE PRESIONO COMO "botonActivo"
    const modal = new bootstrap.Modal(document.getElementById('modalEvaluacionCounselor'));
    modal.show();
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
    const modalElement = document.getElementById('modalEvaluacionCounselor');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    document.getElementById('btnEvaluar-1').classList.add('d-none')
    document.getElementById('btnEvaluar-1-txt').classList.remove('d-none')
    
});

// SE INICIA EN LA PAGINA 1
mostrarPagina(1);