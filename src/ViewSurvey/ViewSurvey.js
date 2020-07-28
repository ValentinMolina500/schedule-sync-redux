import React, { useRef, useEffect, useState } from 'react';
import "./ViewSurvey.css";
import { select, scaleLinear, max, scaleBand, axisLeft } from "d3";

/* Multiply by two for left and right */
const PADDING = 64 * 2


const DATA = [
    { date: "Wed Jun 17", people: 3 },
    { date: "Thu Jun 18", people: 6 },
    { date: "Fri Jun 19", people: 2 },
    { date: "Sat Jun 20", people: 10 },
    { date: "Sat Jun 21", people: 10 },
    { date: "Sat Jun 22", people: 10 },
    { date: "Sat Jun 23", people: 10 },
    { date: "Sat Jun 24", people: 10 },
];

export default () => {
    const containerRef = useRef(null);
    const chartRef = useRef(null);

    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        // setContainerWidth(containerRef.current.clientWidth - PADDING);
        setContainerHeight(400);
    }, [containerRef])

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }

        const renderChart = () => {
            const yScale = scaleLinear()
                .domain([0, max(DATA, d => d.people)])
                .range([0, 400])

            const svg = select("svg");
            // console.log(svg);
            svg.attr("width", DATA.length * 90)
            const xScale = scaleBand()
                .domain(DATA.map(d => d.date))
                .range([0, DATA.length * 90])
                .padding(0.1)
            const margin = { top: 20, right: 20, bottom: 20, left: 20};
            const yAxis = axisLeft(yScale);

            const g = svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

                yAxis(g.append('g'));
            g.selectAll("rect").data(DATA)

                .enter().append("rect")
                    .attr("x", d => xScale(d.date))
                    // .attr("transform", "translate(0, " + (400) + ")")
                    .attr("y", d => (400 - yScale(d.people)))
                    .attr("width", 80)
                        .attr("height", d => yScale(d.people))
                    .attr("fill", "#805ad5")
                            .attr("rx", 4)
                            .attr("ry", 4)
            // const xScale = scaleLinear()
            //     .domain([0, max(DATA, d => d.people)])
            //     .range([0, 600])
            
            // console.log(xScale.domain());
            // const svg = select("svg");
            
            // const yScale = scaleBand()
            //     .domain(DATA.map(d => d.date))
            //     .range([0, 300])
            //     .padding(0.1);

            // const width =  +svg.attr("width");
            // const height = +svg.attr("height");

            // /* Render the data */
            // svg.selectAll("rect").data(DATA)
            //     .enter().append("rect")
            //         .attr('y', d => yScale(d.date))
            //         .attr("width", d => xScale(d.people))
            //         .attr("height", yScale.bandwidth())
            //         .attr("fill", "#805ad5")
            //         .attr("rx", 4)
            //         .attr("ry", 4)
        }   
        console.log("Hello!")
        renderChart();

    }, [chartRef])

    return (
        <div className="ViewSurvey">
            <div className="main-container" ref={containerRef}>
                <h1 className="headline">View Survey</h1>
                <div className="survey-title">Party at Ford's House</div>
                <div className="date-subheading-container">
                    <span className="date-label">Wednesday, July 24</span>
                    {/* <span className="time-label">10:00am&mdash;4:00Pm</span> */}
                </div>
                
                <div className="bar-chart-container">
                    <svg className="bar-chart" ref={chartRef} height={containerHeight} />
                </div>
            </div>
        </div>
    );
}

function getChartWidth(containerRef) {
    return containerRef.current ? containerRef.current.clientWidth : 0;
}

function getChartHeight(containerRef) {
    return containerRef.current ? containerRef.current.clientHeight : 0;
}
