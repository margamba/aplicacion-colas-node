//Comando para establecer la comunicacion
var socket = io();

var label = $('small');

//obtenemos los parametros de la url, porque alli viene el escritorio
var searchParams = new URLSearchParams(window.location.search);
//para verificar que existe este parametro
if (!searchParams.has('escritorio')) {

    window.location = index.html;
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp.numero);
        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('Ticket ' + resp.numero);
    })
})