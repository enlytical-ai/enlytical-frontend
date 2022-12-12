import { Chart, getElementsAtEvent } from 'react-chartjs-2';
import { useRef, useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    registerables,
} from 'chart.js';

import { NotificationContainer, NotificationManager } from 'react-notifications';
ChartJS.register(
    ...registerables
);
const LineGraph = (props) => {
    const { data, graphDataType, yAxesColor, y1AxesColor } = props;
    const xAxisDataArray = [...data.labels];
    const chartRef = useRef();
    const [startXAxisDateArray, setStartXAxisDateArray] = useState([]);
    const [endXAxisDateArray, setEndXAxisDateArray] = useState([]);
    const [mouseDownValue, setMouseDownValue] = useState(null);

    const [startLine, setStartLine] = useState([]);
    const [endLine, setEndLine] = useState([]);

    const [lineStartEndPoints, setLineStartEndPoints] = useState([]);

    // {
    //     startX: null,
    //     startY: null,
    //     endX: null,
    //     endY: null
    // }
    const onClick = function (e) {
        // console.log(getElementsAtEvent(chartRef.current, e));
        // const { ctx } = chartRef.current
        // ctx.fillStyle = "lightgreen";
        // ctx.fillRect(30, 200, 955, 50);
    }
    useEffect(() => {
        props.graphAreaSelectFn({
            startDateArray: startXAxisDateArray,
            endDateArray: endXAxisDateArray
        })
    }, [startXAxisDateArray, endXAxisDateArray]);


    const onMouseDown = function (e) {
        //  window.addEventListener("mousemove", onMouseMove)

        setMouseDownValue(null);
        const el = getElementsAtEvent(chartRef.current, e)[0];

        if (el) {
            if (startXAxisDateArray.length < 2 && endXAxisDateArray.length < 2) {
                const index = el.index;
                setMouseDownValue(xAxisDataArray[index]);
                const { x, y } = el.element;
                setStartLine([{
                    x, y
                }]);
                setEndLine([{
                    x, y
                }])
                console.log("onMouseDow", xAxisDataArray[index]);
            } else {
                NotificationManager.error("You cannot select more than two areas.", 'Warning', 3000);
            }

        }
    }
    const onMouseUp = function (e) {
        // window.removeEventListener("mousemove", onMouseMove);
        setEndLine([]);
        setStartLine([]);
        const el = getElementsAtEvent(chartRef.current, e)[0];
        if (el && mouseDownValue) {
            const index = getElementsAtEvent(chartRef.current, e)[0].index;
            console.log("onMouseUp", xAxisDataArray[index]);
            setEndXAxisDateArray(prevState => ([...prevState, xAxisDataArray[index]]));
            setStartXAxisDateArray(prevState => ([...prevState, mouseDownValue]));
        }
        setMouseDownValue(null);
    }

    const onMouseMove = function (e) {
        // const el = (chartRef.current, e)[0];
        // console.log(el);   
        //console.log(chartRef.current)   

        const { layerX, layerY } = e.nativeEvent
        // console.log(layerX, layerY);
        setEndLine([{
            x: layerX,
            y: layerY - 28
        }])
    }

    console.log(startLine, endLine)
    const reset = () => {
        setStartXAxisDateArray([]);
        setEndXAxisDateArray([]);
    }
    const dateHighlighter = {
        id: "dateHighlighter",
        afterDatasetDraw(chart, args, pluginOptions) {
            const { ctx } = chart;
            const { x, y } = chart.scales;
            const angle = Math.PI / 180;
            ctx.save();
            const { top, left, bottom, right, width, height } = chart.chartArea

            for (let i = 0; i < pluginOptions.startLine.length; i++) {
                ctx.beginPath();
                ctx.moveTo(pluginOptions.startLine[i].x, pluginOptions.startLine[i].y);
                ctx.lineTo(pluginOptions.endLine[i].x, pluginOptions.endLine[i].y);
                ctx.stroke();
            }

            for (let i = 0; i < pluginOptions.startDate.length; i++) {
                const startDate = pluginOptions.startDate[i];
                const endDate = pluginOptions.endDate[i];
                ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
                ctx.fillRect(x.getPixelForValue(startDate), top, x.getPixelForValue(endDate) - x.getPixelForValue(startDate), height);
            }
            ctx.rotate(90 * angle)
            for (let j = 0; j < pluginOptions.startDate.length; j++) {
                const startDate = pluginOptions.startDate[j];
                const endDate = pluginOptions.endDate[j];
                const diff = (x.getPixelForValue(endDate) - x.getPixelForValue(startDate)) / 2;
                ctx.translate(0, 0);
                ctx.fillStyle = "#666";
                ctx.textAlign = "center";
                ctx.font = "bold 12px sans-serif";
                ctx.fillText(`${startDate} - ${endDate}`, height / 2 + top, (x.getPixelForValue(startDate) + diff) * -1);
            }
            ctx.restore();
        }
    }
    return (
        <div>
            <div>
                <button onClick={reset} >Reset</button>
            </div>
            <div>
                <  Chart
                    data={data}
                    height={300}
                    //  onClick={onClick}
                    //onMouseDow={onMouseDow}
                    onMouseDownCapture={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                    ref={chartRef}
                    plugins={[dateHighlighter]}
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
                                        borderColor: yAxesColor ? yAxesColor : "#e0e0e0",
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
                            plugins: {
                                dateHighlighter: {
                                    startDate: startXAxisDateArray,
                                    endDate: endXAxisDateArray,
                                    label: [],
                                    startLine: startLine,
                                    endLine: endLine
                                }
                            }
                            // onClick: (e) => {
                            //     console.log(e.chart.ctx)
                            //     const { ctx } = e.chart
                            //     ctx.fillStyle = "lightgreen";
                            //     ctx.fillRect(30, 200, 955, 100);
                            // }
                        }
                    }
                />
            </div>

            <NotificationContainer />
        </div>
    )
}

export default LineGraph;