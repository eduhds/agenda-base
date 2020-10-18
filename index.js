const DIAS_SEMANA = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

const gerarDiasMes = quantDias => {
    return Array.from(Array(quantDias)).map((item, index) => index + 1);
};

const MESES = [
    {
        nome: 'Janeiro',
        sigla: 'JAN',
        dias: gerarDiasMes(31)
    },
    {
        nome: 'Fevereiro',
        sigla: 'FEV',
        dias: gerarDiasMes(29)
    },
    {
        nome: 'Março',
        sigla: 'MAR',
        dias: gerarDiasMes(31)
    },
    {
        nome: 'Abril',
        sigla: 'ABR',
        dias: gerarDiasMes(30)
    },
    {
        nome: 'Maio',
        sigla: 'MAI',
        dias: gerarDiasMes(31)
    },
    {
        nome: 'Junho',
        sigla: 'JUN',
        dias: gerarDiasMes(30)
    },
    {
        nome: 'Julho',
        sigla: 'JUL',
        dias: gerarDiasMes(31)
    },
    {
        nome: 'Agosto',
        sigla: 'AGO',
        dias: gerarDiasMes(31)
    },
    {
        nome: 'Setembro',
        sigla: 'SET',
        dias: gerarDiasMes(30)
    },
    {
        nome: 'Outubro',
        sigla: 'OUT',
        dias: gerarDiasMes(31)
    },
    {
        nome: 'Novembro',
        sigla: 'NOV',
        dias: gerarDiasMes(30)
    },
    {
        nome: 'Dezembro',
        sigla: 'DEZ',
        dias: gerarDiasMes(31)
    }
];

const HORAS = Array.from(Array(24)).map((item, index) => index + 1);

const INTERVALOS = {
    DOM: null,
    SEG: [
        { i: 8, f: 12 },
        { i: 14, f: 18 }
    ],
    TER: [
        { i: 8, f: 12 },
        { i: 14, f: 18 }
    ],
    QUA: [
        { i: 8, f: 12 },
        { i: 14, f: 18 }
    ],
    QUI: [
        { i: 8, f: 12 },
        { i: 14, f: 18 }
    ],
    SEX: [
        { i: 8, f: 12 },
        { i: 14, f: 18 }
    ],
    SAB: [{ i: 8, f: 12 }]
};

/**
 * Um evento / ocorrência na agenda
 *
 * @class Evento
 */
class Evento {
    /**
     *Creates an instance of Evento.
     * @param {string} [diaSemana='']
     * @param {number} [diaMes=0]
     * @param {string} [mes='']
     * @param {number} [ano=2020]
     * @param {string} [hora='00:00']
     * @param {string} [descricao='']
     * @memberof Evento
     */
    constructor(
        diaSemana = '',
        diaMes = 0,
        mes = '',
        ano = 2020,
        hora = '00:00',
        descricao = ''
    ) {
        this.diaSemana = diaSemana;
        this.diaMes = diaMes;
        this.mes = mes;
        this.ano = ano;
        this.hora = hora;
        this.descricao = descricao;
    }
}

/**
 * Gerencimando de agenda
 *
 * @class AgendaBase
 */
class AgendaBase {
    /**
     *Creates an instance of AgendaBase.
     * @param {Array<Evento>} [eventos=[]]
     * @param {Array<Object>} [intervalos=INTERVALOS]
     * @memberof AgendaBase
     */
    constructor(eventos = [], intervalos = INTERVALOS) {
        this.eventos = eventos;
        this.intervalos = intervalos;
        this.diasSemana = DIAS_SEMANA;
        this.meses = MESES;
        this.horas = HORAS;
    }

    /**
     * Obter eventos da agenda
     *
     * @returns {Array<Evento>}
     * @memberof AgendaBase
     */
    getEventos() {
        return this.eventos;
    }

    /**
     * Obter intervalos
     *
     * @returns {Object}
     * @memberof AgendaBase
     */
    getIntervalos() {
        return this.intervalos;
    }

    /**
     * Obter dias da semana
     *
     * @returns {Array<string>}
     * @memberof AgendaBase
     */
    getDiasSemana() {
        return this.diasSemana;
    }

    /**
     * Obter meses do ano
     *
     * @returns {Array<Object>}
     * @memberof AgendaBase
     */
    getMeses() {
        return this.meses;
    }

    /**
     * Obter horas por dia da semana
     *
     * @param {string} diaSemana
     * @returns {Array<number>}
     * @memberof AgendaBase
     */
    getHoras(diaSemana) {
        let horas = [];

        if (this.intervalos[diaSemana]) {
            this.intervalos[diaSemana].forEach(({ i, f }) => {
                this.horas.forEach(h => {
                    if (h >= i && h <= f) {
                        horas.push(h);
                    }
                });
            });
        }
        return horas;
    }

    /**
     * Obter apenas horas disponíveis em um dia da semana
     *
     * @param {string} diaSemana
     * @param {string} diaMes
     * @param {string} mes
     * @param {number} ano
     * @returns {Array<number>}
     * @memberof AgendaBase
     */
    getHorasDisponiveis(diaSemana, diaMes, mes, ano) {
        let horas = this.getHoras(diaSemana);
        return horas.filter(
            h =>
                this.eventos
                    .filter(
                        e =>
                            e.diaMes === diaMes &&
                            e.mes === mes &&
                            e.ano === ano
                    )
                    .map(e => e.hora)
                    .indexOf(h) === -1
        );
    }

    /**
     * Adicionar Evento à agenda
     *
     * @param {string} diaSemana
     * @param {number} diaMes
     * @param {string} mes
     * @param {number} ano
     * @param {string} hora
     * @param {string} descricao
     * @memberof AgendaBase
     */
    novo(diaSemana, diaMes, mes, ano, hora, descricao) {
        this.eventos.push(
            new Evento(diaSemana, diaMes, mes, ano, hora, descricao)
        );
    }

    /**
     * Salvar agenda
     *
     * @param {Function} onSalvar Persistir agenda em armazenamento, sistema de arquivos etc.
     * @returns {Promise}
     * @memberof AgendaBase
     */
    salvar(onSalvar) {
        return new Promise((resolve, reject) => {
            try {
                onSalvar(this.eventos);
                resolve();
            } catch (error) {
                reject();
            }
        });
    }
}

module.exports = AgendaBase;
