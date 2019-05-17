import * as React from "react";
import { Column, Row } from 'simple-flexbox';

import { PieComponentChart } from './chartComponents/PieComponentChart'
import { HorizontalBarComponentChart } from './chartComponents/HorizontalBarComponentChart'
import { SampleTextComponent } from './chartComponents/SampleTextComponent'
import { DoughnutComponentChart } from './chartComponents/DoughnutComponentChart'
import { RadarComponentChart } from './chartComponents/RadarComponentChart'
import { ArrowComponent } from './chartComponents/ArrowComponent'
import { PolarareaComponentChart } from "./chartComponents/PolarareaComponentChart"
import { LineComponent } from './chartComponents/LineComponent'
import { GradientLineComponentChart } from './chartComponents/GradientLineComponentChart'
import { BarComponentChart } from './chartComponents/BarComponentCharts' 
import { StackedHorizontalBar } from './chartComponents/StackedHorizontalBar'

const data = require('./object2.json') 

export class ChartWriter extends React.Component {

    renderParts = () => {
        
        return( 
            data.rows.map( (value,indexOfRow) => {
                return (
                    <Row flex={"1"} key={"row"+indexOfRow} wrap={true}>
                        {
                            value.columns.map( (components,indexOfColumn) => {
                                    return(
                                        <Row flexGrow={1} wrap={true} key={"RowOfRow"+indexOfRow+"_"+indexOfColumn} justifyContent='center' alignItems='center' horizontal='around' style={{backgroundColor:'white',margin:3,borderRadius:10}}>
                                            {this.renderPart(components,indexOfRow,indexOfColumn)}   
                                        </Row>
                                    )
                            })
                        }
                    </Row>
                )
            })
        )
    }

    renderPart = (components,indexOfRow,indexOfColumn) => {

        let finishedComponent = []
        
        if(components.primary){
            finishedComponent.push(
                <Column key={"columnOfRowPrimary"+indexOfRow+"_"+indexOfColumn}>
                    {this.pickChartOrComponent(components.primary,components.primaryData)}
                </Column>
            )
        }
        
        if(components.secondary){
            finishedComponent.push(
                <Column key={"columnOfRowSecondary"+indexOfRow+"_"+indexOfColumn}>
                    {this.pickChartOrComponent(components.secondary,components.secondaryData)}
                </Column>
            )
        }
        
        return(finishedComponent)
    }

    pickChartOrComponent = (type,data) => {
        switch(type){
            case "horizontalStaple":
                return <HorizontalBarComponentChart data={data}/>
            case "pie":
                return <PieComponentChart data={data}/>
            case "doughnut":
                return <DoughnutComponentChart data={data} />
            case "radar":
                return <RadarComponentChart data={data} />
            case "polar":
                return <PolarareaComponentChart data={data} />
            case "sampleText":
                return <SampleTextComponent data={data}/>
            case "arrow":
                return <ArrowComponent data={data} />
            case "line":
                return <LineComponent data={data}/>
            case "gradientLine":
                return <GradientLineComponentChart data={data} />
            case "bar":
                return <BarComponentChart data={data} />
            case "horizontalStackedStaple":
                return <StackedHorizontalBar data={data} />
            default:
                return
        }
    }

    render(){
        let values = this.renderParts()
        
        return(
            <Column flex={"1"} justifyContent="center" style={{padding:'2%',minHeight:'92vh'}}>
                {values}
                
            </Column>
            
        )
    }
}