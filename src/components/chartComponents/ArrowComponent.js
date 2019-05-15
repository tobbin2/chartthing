import * as React from 'react'
import { Column, Row } from 'simple-flexbox';

const arrowUp = require('./images/arrowUp.png')
const arrowDown = require('./images/arrowDown.png')

export class ArrowComponent extends React.Component{

    render(){
        return(
            <div>
                <Row wrap={true} >
                    <Column justifyContent='center' alignItems='center'>
                        <img src={arrowUp} style={{width:'5vh',height:'5vh', margin: '1vh'}}></img>
                        <h1 style={{margin:0,fontWeight:700,fontFamily:'Verdana'}}>text</h1>
                        <p style={{color:'blue',fontFamily:'Verdana'}}>text</p>
                    </Column>
                   <Column>
                   <div style={{borderLeft: '2px dashed #1C83B0',height:'100%',marginRight:'20px',marginLeft:'20px'
                   }}>
                    </div>
                   </Column>
                    <Column justifyContent='center' alignItems='center'>
                        <img src={arrowDown} style={{width:'5vh',height:'5vh', margin: '1vh'}}></img>
                        <h1 style={{margin:0,fontWeight:700,fontFamily:'Verdana'}}>text</h1>
                        <p style={{color:'blue',fontFamily:'Verdana'}}>text</p>
                    </Column>
                </Row>
            </div>
        )
    }

}
