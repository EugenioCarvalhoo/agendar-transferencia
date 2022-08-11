import { TipoTransferenciaEnum } from "../enums/TipoTransferenciaEnum"

export default interface SolicitarAgendamento {
    contaOrigem: string
    contaDestino: string
    dataAgendamento: String
    valor: number
    tipoTransferencia: TipoTransferenciaEnum
}