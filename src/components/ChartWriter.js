import * as React from "react";
import { Column, Row } from 'simple-flexbox';
import { PieComponentChart } from './chartComponents/PieComponentChart'


const data = require('./object.json') 

export class ChartWriter extends React.Component {

    renderParts = () => {
        
        let c = data.rows.map( (value,indexOfRow) => {
                return (
                    <Row flex={"1"} key={"row"+indexOfRow}>
                        {
                            value.columns.map( (Component,indexOfColumn) => {
                                return(
                                    <Column flexGrow={1} key={"column"+indexOfRow+indexOfColumn} horizontal='center' justifyContent='center' style={{backgroundColor:'white',margin:3,borderRadius:10}}>
                                        {Component.type}
                                        <PieComponentChart />
                                    </Column>
                                )
                            })
                        }
                    </Row>
                )
            })
        return c
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