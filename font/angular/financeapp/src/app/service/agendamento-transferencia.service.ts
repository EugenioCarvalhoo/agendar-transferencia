import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders }    from '@angular/common/http';  
import SolicitarAgendamento from '../model/SolicitarAgendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoTransferenciaService {

  readonly rootURL = 'http://localhost:8080/v1/agendamento_transferencia';

  constructor(private http: HttpClient) {}

  httpOptions = {  
      headers: new HttpHeaders({  
        'Content-Type': 'application/json'  
      })  
  }

  getAll() {
    return this.http.get<SolicitarAgendamento[]>(`${this.rootURL}/all`);
  }

  salvarAgendamentoTransferencia(data: SolicitarAgendamento) {
    return this.http.post(`${this.rootURL}/salvarAgendamento`, data);
  }
}
