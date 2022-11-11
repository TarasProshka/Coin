import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
} from 'chart.js';
import { dateNumFormater } from './dateFormat.js';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
)

export const inOutChart = data => {
    if (data.transactions !== []) {
        const currentArrayIn = []
        const currentArrayOut = []
        const array = data.transactions
        const obj = array.reduce((acc, el) => {
            acc[dateNumFormater(el.date).split('.')[1]]
                = (acc[dateNumFormater(el.date).split('.')[1]] || 0) + 1; return acc;
        }, {})
        if (!obj['11']) {
            obj['11'] = 0
        }
        if (!obj['10']) {
            obj['10'] = 0
        }
        if (!obj['09']) {
            obj['09'] = 0
        }
        if (!obj['08']) {
            obj['08'] = 0
        }
        if (!obj['07']) {
            obj['07'] = 0
        }
        if (!obj['06']) {
            obj['06'] = 0
        }
        if (!obj['05']) {
            obj['05'] = 0
        }
        if (!obj['04']) {
            obj['04'] = 0
        }
        if (!obj['03']) {
            obj['03'] = 0
        }
        if (!obj['02']) {
            obj['02'] = 0
        }
        if (!obj['01']) {
            obj['01'] = 0
        }
        const currentObj = Object.entries(obj).sort((a, b) => a < b ? -1 : 1)
        let control = 0
        let controlOver = 0
        for (let i = 0; i < currentObj.length; i++) {
            const repeats = currentObj[i][1]
            let currentIn = 0
            let currentOut = 0
            if (repeats === 0) {
                currentArrayIn.push(0)
                currentArrayOut.push(0)
                continue
            }
            for (let m = control; m < repeats + controlOver; m++) {
                if (array[m].to === data.account) {
                    currentIn = currentIn + array[m].amount
                } else {
                    currentOut = currentOut + array[m].amount
                }
                control++
            }
            controlOver = controlOver + repeats
            currentArrayIn.push(currentIn)
            currentArrayOut.push(currentOut)
        }

        const current = []

        currentObj.map(i => current.push(i[0]))

        for (let i = 0; i < current.length; i++) {
            if (current[i] === '12') {
                current[i] = 'Декабрь'
            }
            if (current[i] === '11') {
                current[i] = 'Ноябрь'
            }
            if (current[i] === '10') {
                current[i] = 'Октябрь'
            }
            if (current[i] === '09') {
                current[i] = 'Сентябрь'
            }
            if (current[i] === '08') {
                current[i] = 'Август'
            }
            if (current[i] === '07') {
                current[i] = 'Июль'
            }
            if (current[i] === '06') {
                current[i] = 'Июнь'
            }
            if (current[i] === '05') {
                current[i] = 'Май'
            }
            if (current[i] === '04') {
                current[i] = 'Апрель'
            }
            if (current[i] === '03') {
                current[i] = 'Март'
            }
            if (current[i] === '02') {
                current[i] = 'Февраль'
            }
            if (current[i] === '01') {
                current[i] = 'Январь'
            }
        }

        const chart = document.createElement('canvas')
        chart.style.paddingBottom = '25px'
        chart.id = 'in-out-chart'
        const ctx = chart.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: current,
                datasets: [
                    {
                        label: 'Динамика исходящих транзакций',
                        data: currentArrayOut,
                        backgroundColor: '#FD4E5D'
                    },
                    {
                        label: 'Динамика входящих транзакций',
                        data: currentArrayIn,
                        backgroundColor: '#76CA66'
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: false
                },
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true
                    }
                }
            }
        })
        return chart
    }
}