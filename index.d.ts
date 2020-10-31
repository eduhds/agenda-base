export as namespace AgendaBase;

export default class AgendaBase {
    constructor(eventos: Array<any>, intervalos: Array<any>);

    getEventos(): Array<any>;

    getIntervalos(): Array<any>;

    getDiasSemana(): Array<string>;

    getMeses(): Array<any>;

    getHoras(diaSemana: string): Array<number>;

    getHorasDisponiveis(diaSemana: string, diaMes: number, mes: string, ano: number): Array<number>;

    novo(diaSemana: string, diaMes: number, mes: string, ano: number, hora: string, descricao: string): void;

    salvar(onSalvar: (eventos: Array<any>) => void): Promise;

    formatHoras(horas: Array<number> | number, sufixo: boolean = false): string;
}