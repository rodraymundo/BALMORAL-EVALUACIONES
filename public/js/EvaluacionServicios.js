let paginaActual = 1;
const totalPaginas = 2;

let botonActivo = null;//SABER QUE BOTON "EVALUAR FUE EL QUE SE PRESIONO"
let btnAtras = null;//SABER CON QUE BOTON DE ATRAS SE ESTARA TRABAJANDO
let btnSiguiente = null;//SABER CON QUE BOTON DE SIGUIENTE SE ESTARA TRABAJANDO
let pageName = null;//SABER CON QUE PAGINAS SE ESTARA TRABAJANO
let btnFinalizarName = null; //SABER QUE BOTON DE FINALIZAR SE ESTA OCUPANDO


//PARA SABER QUE BOTON DE EVALUAR SE PRESIONO Y PODER QUITARLO UNA VEZ QUE LA EVALUACION SE HAYA REALIZADO
document.querySelectorAll('.evaluar-btn').forEach(btn => {//LE AGREGA A TODOS LOS BOTONES EL EVENTO 
    btn.addEventListener('click', (e) => {//CUANDO SE PRESIONA EL BOTON
        botonActivo = e.currentTarget;//DECLARA LA REFERENCIA DEL BOTON QUE SE PRESIONO COMO "botonActivo"
        let modal;
        switch (botonActivo.id) {
            case 'btnEvaluar-Ca':
                    modal = new bootstrap.Modal(document.getElementById('modalEvaluacionCafeteria'));
                    btnAtras = 'btnAtras-Ca';
                    btnSiguiente = 'btnSiguiente-Ca';
                    pageName= 'pagina-Ca-'
                    btnFinalizarName = 'btnFinalizar-Ca'
                    console.log(btnAtras);
                    console.log(btnSiguiente);
                    console.log(pageName);
                break;
            case 'btnEvaluar-Tr':
                    modal = new bootstrap.Modal(document.getElementById('modalEvaluacionTransporte'));
                    btnAtras = 'btnAtras-Tr';
                    btnSiguiente = 'btnSiguiente-Tr';
                    pageName = 'pagina-Tr-'
                    btnFinalizarName = 'btnFinalizar-Tr'
                break;
            
            case 'btnEvaluar-Ps':
                    modal = new bootstrap.Modal(document.getElementById('modalEvaluacionPsicopedagogico'));
                    btnAtras = 'btnAtras-Ps';
                    btnSiguiente = 'btnSiguiente-Ps';
                    pageName = 'pagina-Ps-'
                    btnFinalizarName = 'btnFinalizar-Ps'
                break;
            case 'btnEvaluar-Pa':
                    modal = new bootstrap.Modal(document.getElementById('modalEvaluacionParamedico'));
                    btnAtras = 'btnAtras-Pa';
                    btnSiguiente = 'btnSiguiente-Pa';
                    pageName = 'pagina-Pa-'
                    btnFinalizarName = 'btnFinalizar-Pa'
                break;
            default:
                break;
        }
        mostrarPagina(1);//PARA MOSTRAR LA PRIMER PAGINA Y QUE NO SE MUESTRE LA PAGINA ACTUAL PUES ESTA SE PUEDE QUEDAR GUARDADA COMO 4 AL REALIZAR OTRA EVALUACION ANTES
        paginaActual=1;//PARA QUE EL NUMERO DE PAGINA SE REINICIE CADA VEZ QUE SE ABRA UN MODAL
        modal.show();

        //SE PONEN DENTRO DE EL EVENTO DE EL BOTON DE EVALUAR PARA QUE NO SE INICIEN HASTA QUE LAS VARIABLES DE LOS BOTONES TENGAN EL VALOR ID QUE DEBEN DE TENER
        //BOTON DE SIGUIENTE
        document.getElementById(btnSiguiente).addEventListener('click', () => {
            console.log(paginaActual);
            if (paginaActual < totalPaginas) {
                paginaActual++;
                mostrarPagina(paginaActual);
            }
            console.log(paginaActual);
        });

        //BOTON DE ATRAS
        document.getElementById(btnAtras).addEventListener('click', () => {
            if (paginaActual > 1) {
                paginaActual--;
                mostrarPagina(paginaActual);
            }
            console.log(paginaActual);
        });

        //BOTON DE TERMINAR EVALUACION
        document.getElementById(btnFinalizarName).addEventListener('click', () => {
            alert('Evaluación finalizada. Gracias por su participación.');
            // CERRAR EL MODAL
            let modalElement;
            switch (botonActivo.id) {
                case 'btnEvaluar-Ca':
                        modalElement = document.getElementById('modalEvaluacionCafeteria');
                    break;
                case 'btnEvaluar-Tr':
                        modalElement = document.getElementById('modalEvaluacionTransporte');
                    break;
                
                case 'btnEvaluar-Ps':
                        modalElement = document.getElementById('modalEvaluacionPsicopedagogico');
                    break;
                case 'btnEvaluar-Pa':
                        modalElement = document.getElementById('modalEvaluacionParamedico');
                    break;
                default:
                    break;
            }
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();

            //QUITAR BOTON DE EVALUAR Y PONER TEXTO 
            botonID = botonActivo.id;
            document.getElementById(botonID).classList.add('d-none')
            document.getElementById(botonID + '-txt').classList.remove('d-none')
            console.log(botonID);
        });
    });
});


//FUNCION PARA MOSTRAR LA PAGINA DEPENDIENDO DE EN CUAL SE ENCUENTRE ANTERIORMENTE
function mostrarPagina(pagina) {
    for (let i = 1; i <= totalPaginas; i++) {
        document.getElementById(pageName + i).classList.add('d-none'); //QUITAR TODAS LAS PAGINAS AL INICIO / ESTE pageName ES QUE SE LE DA A LA FUNCION
    }

    document.getElementById(pageName + pagina).classList.remove('d-none');//QUITAR EL D-NONE A LA PAGINA QUE ESTA



    if(btnAtras != null){
        document.getElementById(btnAtras).style.display = (pagina === 1) ? 'none' : 'inline-block';
    }
    if(btnSiguiente){
        document.getElementById(btnSiguiente).style.display = (pagina === totalPaginas) ? 'none' : 'inline-block';
    }
}