//EC6 permite uso de classes

const fs = require('fs');


class Ticket {

    //Los siguientes son los parametros que necesito para crear un ticket
    //numero de ticket que quiero atender
    //escritorio que lo va a atender
    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }




}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate(); //retorna el dia de la fecha de hoy
        this.tickets = []; //tickets pendientes,es decir que no han sido atendidos por nadie
        this.ultimos4 = []; //ultimos 4 tickets que estan siendo atendidos
        let data = require('./../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }
    siguienteTicket() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null); //ponemos null porque no sabemos quien lo va a atender
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; //asi rompo la relacion que tiene js de que todos los objetos son pasados por referencia 
        this.tickets.shift(); //elimina del arreglo primer ticket
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); //agregamos el ticket al inicio del arreglo con unshift

        if (this.ultimos4.length > 4) {

            this.ultimos4.splice(-1, 1); //borramos el ultimo elemento de una arreglo
        }

        console.log('ultimos 4');
        console.log(this.ultimos4)
        this.grabarArchivo();
        return atenderTicket;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();

    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, //tickets pendientes de atender
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }


}

module.exports = {
    TicketControl

}