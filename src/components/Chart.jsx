import React, { useEffect, useRef } from 'react'
import * as d3 from "d3"
import "../styles/chart/chart.css"

export const Chart = ({ xdim, ydim, margin, xdata }) => {
    const canvas = useRef(null);
    const [change, setChange] = React.useState(true)
    useEffect(() => {
        const svg = d3.select(canvas.current)

        addAxes(svg);
        addText(svg);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [xdim, ydim, margin, xdata])

    // updating the chart
    useEffect(() => {
        const svg = d3.select(canvas.current)
        addBars(svg)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [change])

    // add axis function
    const addAxes = (svg) => {
        const xAxis = d3.axisBottom(xscale);

        svg.append("g")
            .call(xAxis)
            .attr("transform", `translate(0,${ydim + margin.top})`)
            .selectAll('text')
            .attr('text-anchor', 'start')
            .attr('transform', `rotate(45)`)

        const yAxis = d3.axisLeft(yscale);

        svg.append("g")
            .call(yAxis)
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
    }

    const getVals = () => {
        let arr = [];
        for (let i = 0; i <= 11; i++) {
            let random = Math.floor(Math.random() * 10);
            arr.push(random);
        }
        return arr
    }
    const addBars = (svg) => {
        let arr = getVals();
        const linearScale = d3.scaleLinear()
            .domain([0, d3.max(arr)])
            .range([0, ydim])

        const scaledYData = arr.map((yval) => {
            return linearScale(yval);
        })

        let chart = svg.selectAll('rect')
            .data(scaledYData)
        chart
            .enter()
            .append('rect')
            .merge(chart)
            .attr('width', xscale.bandwidth())
            .attr('height', (d) => {
                return d
            })
            .attr('x', (d, i) => {
                return xscale(xdata[i])
            })
            .attr('y', (d) => {
                return margin.top + ydim - d
            })
            .attr('fill', '#0ab4f2')
            .attr('stroke', 'grey')
    };

    // add text
    const addText = (svg) => {
        svg.append("text")
            .text("Data in quantity")
            .attr('x', -(margin.top + margin.bottom + ydim) / 2)
            .attr('y', margin.left / 2)
            .attr("transform", `rotate(-90, ${margin.left / 2}, ${margin.top / 2})`)

    }

    const xscale = d3.scaleBand()
        .domain(xdata)
        .range([margin.left, xdim + margin.left])
        .padding(0.1)

    const yscale = d3.scaleLinear()
        .domain([0, 9])
        .range([ydim, 0])


    return (
        <div className="canvas">
            <svg
                viewBox={`0 0 ${xdim + margin.left + margin.right} ${ydim + margin.top + margin.bottom}`}
                preserveAspectRatio='xMinYMin'
                width='100%'
                height='100%'
                ref={canvas}
            >
            </svg>
            <button onClick={() => {
                setChange(!change)
            }} className="canvas__button">Click here</button>
        </div>
    )
}
