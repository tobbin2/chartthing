import * as React from 'react'
import { Column, Row } from 'simple-flexbox';

const arrowUp = require('./images/arrowUp.png')
const arrowDown = require('./images/arrowDown.png')

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Verdana',
    fontWeight:500,
    width:'100%',
    textAlign:'center'
}

const arrowStyles = {
    width:'5vh',
    height:'5vh',
    margin: '1vh'
}

const percentageStyles = {
    margin:0,
    fontWeight:700,
    fontFamily:'Verdana',
    color:'#1C83B0'

}

const textStyles = {
    color:'#1C83B0',
    fontFamily:'Verdana',
    maxWidth:"15vh",
    textAlign:'center'
}

export class ArrowComponent extends React.Component{
    
    constructor(props){
        super(props)
    }

    createHeader = (text) => {
        return(
            <Row>
                <h2 style={textStyleClass}>{text}</h2>
            </Row>
        )
    }

    render(){
        return(
            <div>
                {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                <Row wrap={true} >
                    <Column justifyContent='center' alignItems='center'>
                        <img src={arrowUp} style={arrowStyles}></img>
                        <h1 style={percentageStyles}>{this.props.data.arrowUp.percentage}</h1>
                        <p style={textStyles}>{this.props.data.arrowDown.text}</p>
                    </Column>
                   <Column>
                   <div style={{borderLeft: '2px dashed #1C83B0',height:'90%',marginRight:'20px',marginLeft:'20px'
                   }}>
                    </div>
                   </Column>
                    <Column justifyContent='center' alignItems='center'>
                        <img src={arrowDown} style={arrowStyles}></img>
                        <h1 style={percentageStyles}>{this.props.data.arrowUp.percentage}</h1>
                        <p style={textStyles}>{this.props.data.arrowDown.text}</p>
                    </Column>
                </Row>
            </div>
        )
    }

}
