import { Chart, Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,


);
const LineGraph = (props) => {
    const { data, graphDataType, yAxesColor, y1AxesColor } = props;

    return (
        <div>
            <  Chart
                data={data}
                height={300}
                options={
                    {
                        tension: 0.4,
                        borderWidth: 1,
                        maintainAspectRatio: false,

                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                            title: {
                                display: true,
                                //  text: 'Chart.js Line Chart',
                            },
                        },
                        interaction: {
                            mode: "index"
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                // ticks: {
                                //     callback: function (val, index) {
                                //         // Hide every 2nd tick label
                                //         if (graphDataType === "daily") {
                                //             const time_stamp = this.getLabelForValue(val);
                                //             const day = new Date(`${time_stamp}T00:00:00.000+00:00`).getDay();
                                //             if (day === 0) return "Sunday";
                                //             if (day === 6) return "Saturday";
                                //             return this.getLabelForValue(val)
                                //         } else {
                                //             return this.getLabelForValue(val);
                                //         }
                                //     },
                                // }
                            },
                            y: {
                                grid: {
                                    display: false,
                                    borderColor: yAxesColor?yAxesColor: "#e0e0e0" ,
                                    borderWidth: 2
                                }
                            },
                            y1: {
                                position: 'right',
                                grid: {
                                    display: false,
                                    borderColor: y1AxesColor ? y1AxesColor : "#e0e0e0",
                                    borderWidth: 2
                                },
                            },

                        },

                        onClick: function (e, x) {
                            console.log(e, x);
                        }
                    }
                }
            />
        </div>
    )
}

export default LineGraph;