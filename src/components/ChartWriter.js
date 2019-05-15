import * as React from "react";
import { Column, Row } from 'simple-flexbox';

import { PieComponentChart } from './chartComponents/PieComponentChart'
import { HorizontalBarComponentChart } from './chartComponents/HorizontalBarComponentChart'
import { SampleTextComponent } from './chartComponents/SampleTextComponent'
import { ArrowComponent } from './chartComponents/ArrowComponent'
import {LineComponent} from './chartComponents/LineComponent';

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
                                        <Row flexGrow={1} key={"column"+indexOfRow+indexOfColumn} horizontal='center' justifyContent='center' style={{backgroundColor:'white',margin:3,borderRadius:10, }}>
                                        
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
             <Column key={"columnOfRow"+indexOfRow+"_"+indexOfColumn}>
                    {this.pickChartOrComponent(components.primary,5)}
                </Column>
            )
        }
        
        if(components.secondary){
            finishedComponent.push(
                <Column key={"columnOfRow"+indexOfRow+"_"+indexOfColumn}>
                    {this.pickChartOrComponent(components.secondary,5)}
                </Column>
            )
        }
        
        return(finishedComponent)
        return (
            Object.keys(components).map( (key) => {
                return(
                    <Column key={"columnOfRow"+indexOfRow+"_"+indexOfColumn}>
                        {   
                            this.pickChartOrComponent(components,key)
                        }
                    </Column>
                )
            })
        )
    }

    pickChartOrComponent = (type,data) => {
        switch(type){
            case "horizontalStaple":
                return <HorizontalBarComponentChart />
            case "pie":
                return <PieComponentChart />
            case "sampleText":
                return <SampleTextComponent />
            case "arrow":
                return <ArrowComponent />
                case "line":
                return <LineComponent />
            default:
                return
        }
    }

    render(){
        let values = this.renderParts()
        
        return(
            <Column flex={"1"} justifyContent="center" style={{padding:'2%',height:'92vh'}}>
                {values}
                
            </Column>
            
        )
    }
}