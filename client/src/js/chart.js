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
import Navigo from 'navigo'
import { getAccount } from './requests.js';
import { renderTransactionsDetail } from './transaction history page.js';
import { createSpinner } from './spinner.js';

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

export const chartRender = (data, full = false) => {
    if (data.transactions !== []) {
        const currentArray = []
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
            let current = 0
            if (repeats === 0) {
                currentArray.push(0)
                continue
            }
            for (let m = control; m < repeats + controlOver; m++) {
                if (array[m].to === data.account) {
                    current = current + array[m].amount
                } else {
                    current = current - array[m].amount
                }
                control++
            }
            controlOver = controlOver + repeats
            currentArray.push(current)
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
        chart.id = 'chart'
        const ctx = chart.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: current.length > 6 && !full ? current.slice(current.length - 6, current.length) : current,
                datasets: [{
                    label: 'Динамика баланса',
                    data: currentArray.length > 6 && !full ? currentArray.slice(currentArray.length - 6, currentArray.length) : currentArray,
                    backgroundColor: [
                        '#116ACC',
                        '#116ACC',
                        '#116ACC',
                        '#116ACC',
                        '#116ACC',
                        '#116ACC'
                    ],
                    borderColor: [
                        '#0f4886',
                        '#0f4886',
                        '#0f4886',
                        '#0f4886',
                        '#0f4886',
                        '#0f4886'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    legend: false
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        if (!full) {
            const router = new Navigo('/')
            const token = localStorage.getItem('token')
            chart.style.cursor = 'pointer'

            chart.addEventListener('click', () => {
                document.body.innerHTML = ''
                router.navigate(`account/${data.account}/transactions-history`)
                router.on('/account/:id/transactions-history', async ({ data }) => {
                    document.body.classList.add('spin')
                    document.body.appendChild(createSpinner())
                    setTimeout(async () => {
                        const token = localStorage.getItem('token')
                        const accountDetail = await getAccount(data.id, token)
                        document.body.append(renderTransactionsDetail(accountDetail).header, renderTransactionsDetail(accountDetail).main)
                        document.body.classList.remove('spin')
                    }, 2000)
                }).resolve()
            })
        }

        return chart
    }
}