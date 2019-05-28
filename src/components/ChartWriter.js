import * as React from "react";
import { Column, Row } from 'simple-flexbox';
import { PieComponentChart } from './otherChartComponents/PieComponentChart'
import { HorizontalBarComponentChart } from './chartComponents/HorizontalBarComponentChart'
import { SampleTextComponent } from './chartComponents/SampleTextComponent'
import { LineComponent } from './chartComponents/LineComponent'
import { BarComponentChart } from './chartComponents/BarComponentCharts'
import { HorizontalStackerBarComponent } from './chartComponents/HorizontalStackedBarComponent'
import { AccidentComponent } from './chartComponents/AccidentComponent'

// for otherChartComponents
import { DoughnutComponentChart } from './otherChartComponents/DoughnutComponentChart'
import { RadarComponentChart } from './otherChartComponents/RadarComponentChart'
import { ArrowComponent } from './otherChartComponents/ArrowComponent'
import { PolarareaComponentChart } from "./otherChartComponents/PolarareaComponentChart"
import { GradientLineComponentChart } from './otherChartComponents/GradientLineComponentChart'

const data = require('./object2.json')
console.log(data);
export class ChartWriter extends React.Component {
    values = {}

    constructor() {
        super()
        this.values = this.renderParts()
    }

    //render all parts, object consist of 2 types of arrays row,col which this one maps through
    renderParts = () => {

        return (
            data.rows.map((value, indexOfRow) => {
                return (
                    <Row flex={"1"} key={"row" + indexOfRow} wrap={true}>
                        {
                            value.columns.map((components, indexOfColumn) => {
                                return (
                                    <Row flex={'1'} wrap={true} key={"RowOfRow" + indexOfRow + "_" + indexOfColumn} justifyContent={'center'} alignItems={'center'} style={{ backgroundColor: 'white', margin: 3, borderRadius: 10 }}>
                                        {this.renderPart(components, indexOfRow, indexOfColumn)}
                                    </Row>
                                )
                            })
                        }
                    </Row>
                )
            })
        )
    }

    //render specific part of what was sent in the parameters
    renderPart = (components, indexOfRow, indexOfColumn) => {

        let finishedComponent = []

        //primary element and secondary element can one object consist of so the developer can design their part with 0 - 2 elements
        if (components.primary) {
            finishedComponent.push(
                <div key={"columnOfRowPrimary" + indexOfRow + "_" + indexOfColumn}>
                    {this.pickChartOrComponent(components.primary, components.primaryData)}
                </div>
            )
        }

        if (components.secondary) {
            finishedComponent.push(
                <div key={"columnOfRowSecondary" + indexOfRow + "_" + indexOfColumn}>
                    {this.pickChartOrComponent(components.secondary, components.secondaryData)}
                </div>
            )
        }

        return (finishedComponent)
    }


    //switch case returns component depending of parameter type
    pickChartOrComponent = (type, data) => {
        switch (type) {
            case "horizontalStaple":
                return <HorizontalBarComponentChart data={data} />
            case "pie":
                return <PieComponentChart data={data} />
            case "doughnut":
                return <DoughnutComponentChart data={data} />
            case "radar":
                return <RadarComponentChart data={data} />
            case "polar":
                return <PolarareaComponentChart data={data} />
            case "sampleText":
                return <SampleTextComponent data={data} />
            case "arrow":
                return <ArrowComponent data={data} />
            case "line":
                return <LineComponent data={data} />
            case "gradientLine":
                return <GradientLineComponentChart data={data} />
            case "bar":
                return <BarComponentChart data={data} />
            case "horizontalStackedStaple":
                return <HorizontalStackerBarComponent data={data} />
            case "accident":
                return <AccidentComponent data={data} />
            default:
                return
        }
    }

    render() {

        return (

            <Column flex={"1"} justifyContent="center" style={{ padding: '2%', minHeight: '92vh' }}>
                {this.values}

            </Column>
        )
    }
}