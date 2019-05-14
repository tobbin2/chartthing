import * as React from "react";
import { Column, Row } from 'simple-flexbox';
import { PieComponentChart } from './chartComponents/PieComponentChart'
import { HorizontalBarComponentChart } from './chartComponents/HorizontalBarComponentChart'


const data = require('./object.json') 

export class ChartWriter extends React.Component {

    renderParts = () => {
        
        return( 
            data.rows.map( (value,indexOfRow) => {
                return (
                    <Row flex={"1"} key={"row"+indexOfRow}>
                        {
                            value.columns.map( (components,indexOfColumn) => {
                                    return(
                                        <Row flexGrow={1} wrap={true} key={"RowOfRow"+indexOfRow+"_"+indexOfColumn} horizontal='center' justifyContent='center' style={{backgroundColor:'white',margin:3,borderRadius:10}}>
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

        return (
            Object.keys(components).map( (key) => {
                return(
                    <Column key={"columnOfRow"+indexOfRow+"_"+indexOfColumn}>
                        {   
                            this.pickChartOrComponent(components[key])
                        }
                    </Column>
                )
            })
        )
    }

    pickChartOrComponent = (type) => {
        switch(type){
            case "horizontalStaple":
                return <HorizontalBarComponentChart />
            case "pie":
                return <PieComponentChart />
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