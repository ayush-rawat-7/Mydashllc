import React from 'react'
import "../styles/Chartpage/chartpage.css"

import { Chart } from "./Chart"

export const ChartPage = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    return (
            <div className="barchart__body">
                <Chart
                    xdim={750}
                    ydim={500}
                    margin={{ top: 80, bottom: 80, left: 120, right: 120 }}
                    xdata={months}
                />
            </div>
    )
}
