import * as React from "react";
import { Column, Row } from 'simple-flexbox';

import { PieComponentChart } from './chartComponents/PieComponentChart'
import { HorizontalBarComponentChart } from './chartComponents/HorizontalBarComponentChart'
import { SampleTextComponent } from './chartComponents/SampleTextComponent'
import { ArrowComponent } from './chartComponents/ArrowComponent'

const data = require('./object.json') 

export class ChartWriter extends React.Component {

    renderParts = () => {
        
        return( 
            data.rows.map( (value,indexOfRow) => {
                return (
                    <Row flex={"1"} key={"row"+indexOfRow} wrap={true}>
                        {
                            value.columns.map( (components,indexOfColumn) => {
                                    return(
                                        <Row flexGrow={1} wrap={true} key={"RowOfRow"+indexOfRow+"_"+indexOfColumn} justifyContent='center' alignItems='center' style={{backgroundColor:'white',margin:3,borderRadius:10}}>
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
        console.log(components)
        let finishedComponent = []
        if(components.primary){
            finishedComponent.push(
                <Column key={"columnOfRowPrimary"+indexOfRow+"_"+indexOfColumn}>
                    {this.pickChartOrComponent(components.primary,components.primaryData)}
                </Column>
            )
        }
        
        if(components.secondary){
            console.log(components.secondary, " ", indexOfRow , " ", indexOfColumn)
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
            case "sampleText":
                return <SampleTextComponent data={data}/>
            case "arrow":
                return <ArrowComponent data={data}/>
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