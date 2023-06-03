import { Component, OnInit } from '@angular/core';

interface Evento {
  id: number; // Nuevo campo para identificar cada evento
  titulo: string;
  descripcion: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  finalizado: boolean;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  eventos: Evento[] = [];
  mostrarForm: boolean = false;
  nuevoEvento: Evento = {
    id: 0, // Nuevo campo inicializado a 0
    titulo: '',
    descripcion: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    finalizado: false
  };

  ngOnInit() {
    this.recuperarEventos();
  }

  mostrarFormulario() {
    this.mostrarForm = true;
  }

  agregarEvento() {
    if (this.nuevoEvento.id !== 0) {
      // Editar un evento existente
      const index = this.eventos.findIndex(e => e.id === this.nuevoEvento.id);
      if (index !== -1) {
        const evento: Evento = { ...this.nuevoEvento };
        evento.fecha = new Date(this.nuevoEvento.fecha).toISOString().split('T')[0];
        evento.horaInicio = this.nuevoEvento.horaInicio.substring(0, 5);
        evento.horaFin = this.nuevoEvento.horaFin.substring(0, 5);

        this.eventos[index] = evento;
        this.ordenarEventos();
        this.guardarEventos();
      }
    } else {
      // Agregar un nuevo evento
      const evento: Evento = { ...this.nuevoEvento };
      evento.id = this.obtenerNuevoId();
      evento.fecha = new Date(this.nuevoEvento.fecha).toISOString().split('T')[0];
      evento.horaInicio = this.nuevoEvento.horaInicio.substring(0, 5);
      evento.horaFin = this.nuevoEvento.horaFin.substring(0, 5);

      this.eventos.push(evento);
      this.ordenarEventos();
      this.guardarEventos();
    }

    // Restaurar el estado original del formulario y cerrarlo
    this.nuevoEvento = {
      id: 0,
      titulo: '',
      descripcion: '',
      fecha: '',
      horaInicio: '',
      horaFin: '',
      finalizado: false
    };
    this.mostrarForm = false;
  }

  editarEvento(evento: Evento) {
    this.nuevoEvento = { ...evento };
    this.mostrarForm = true;
  }
  
  marcarFinalizado(evento: any) {
    evento.finalizado = !evento.finalizado;
    this.actualizarLocalStorage();
  }
  
  actualizarLocalStorage() {
    localStorage.setItem('eventos', JSON.stringify(this.eventos));
  }
  

  borrarEvento(evento: Evento) {
    const index = this.eventos.findIndex(e => e.id === evento.id);
    if (index !== -1) {
      this.eventos.splice(index, 1);
      this.guardarEventos();
    }
  }



  ordenarEventos() {
    this.eventos.sort((a, b) => {
      const fechaA = new Date(a.fecha + 'T' + a.horaInicio);
      const fechaB = new Date(b.fecha + 'T' + b.horaInicio);
      return fechaA.getTime() - fechaB.getTime();
    });
  }

  guardarEventos() {
    localStorage.setItem('eventos', JSON.stringify(this.eventos));
  }

  recuperarEventos() {
    const eventosGuardados = localStorage.getItem('eventos');
    if (eventosGuardados) {
      this.eventos = JSON.parse(eventosGuardados);
      this.ordenarEventos();
    }
  }

  obtenerNuevoId(): number {
    let maxId = 0;
    for (const evento of this.eventos) {
      if (evento.id > maxId) {
        maxId = evento.id;
      }
    }
    return maxId + 1;
  }
}
