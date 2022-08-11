import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoTransferenciaEnum } from 'src/app/enums/TipoTransferenciaEnum';
import SolicitarAgendamento from 'src/app/model/SolicitarAgendamento';
import { AgendamentoTransferenciaService } from 'src/app/service/agendamento-transferencia.service';

type tipoTransf = {
  name: string
  value: number
}

@Component({
  selector: 'app-agendamento-transferencia',
  templateUrl: './agendamento-transferencia.component.html',
  styleUrls: ['./agendamento-transferencia.component.scss'],
})
export class AgendamentoTransferenciaComponent implements OnInit {
  formActive = true

  message: string | null = null;

  data: SolicitarAgendamento = {} as SolicitarAgendamento;
  transferencias: SolicitarAgendamento [] = []

  submitted = false
  tipoTransflist: tipoTransf[] = []
  
  formAgendamentoTransferencia: FormGroup  =  {} as FormGroup
    
  constructor(private service: AgendamentoTransferenciaService) { }

  ngOnInit(): void {
    this.formAgendamentoTransferencia = new FormGroup({
      contaOrigem: new FormControl<Number | null>(null,[Validators.required, Validators.pattern("^[0-9]{6}")]),  
      contaDestino: new FormControl<Number | null>(null,[Validators.required, Validators.pattern("^[0-9]{6}")]),        
      dataAgendamento: new FormControl(null,[Validators.required]),  
      valor: new FormControl<Number | null>(null,[Validators.required]), 
      tipoTransferencia: new FormControl<Number | null>(null,[Validators.required]),  
    })
    this.tipoTransflist = [
      {name: "Debito",  value: TipoTransferenciaEnum.DEBITO},
      {name: "Credito",value: TipoTransferenciaEnum.CREDITO}
    ]
    // this.transferencias.push({
    //   contaDestino: "123123",
    //   valor: 1500,
    //   tipoTransf: TipoTransferenciaEnum.DEBITO
    // })
  }

  onSubmit() {
    this.data = this.formAgendamentoTransferencia.value
    let arr = this.data.dataAgendamento.split("-")
    if (arr.length <= 0) {
      arr = this.data.dataAgendamento.split("/")
    }
    
    this.data.dataAgendamento = `${arr[2]}/${arr[1]}/${arr[0]}`   
    this.service.salvarAgendamentoTransferencia(this.data)
    .subscribe({
      next: (data) => {
        this.message = "Agendamento Realizado Com Sucesso";
      },
      error: (er) => console.error(er)
    })
    this.formAgendamentoTransferencia.reset()
  }

  enableForm() {
    this.formActive  = true
  }

  desableForm()  {
    this.formActive  = false
    this.getAll()
  }

  getAll(): SolicitarAgendamento[]  {
    this.service.getAll()
    .subscribe({
      next: (data) => {
        this.transferencias = data
        console.log("elementa:",data)
      },
      error: (e) => console.error(e)
    })
    return this.transferencias;
  }

}
