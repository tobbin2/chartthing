import * as React from 'react'

export class SampleTextComponent extends React.Component{

    components = null
    alignText = 'left'

    constructor(props){
        super(props)
        if(this.props.data.align)
            this.alignText = this.props.data.align

        /*
            so the user can design the sampleText by themselves are thy able to put which one that they wish to be shown first
            for example {header, text , percentage} will be shown in:
            header
            text
            percentage

            if the order is another way will that order result in that way, user can also add alignItems which sets the alignment of 
            all components inside this component to that alignment. (left == default)
        */
        this.components = Object.keys(this.props.data).map( (key) => {
            switch(key){
                case 'header':
                    return this.createHeader(this.props.data[key])
                case 'percentage':
                    return this.createPercentage(this.props.data[key])
                case 'text':
                    return this.createText(this.props.data[key])
                default:
                    return null
            }
        })
    }

    //creates header
    createHeader = (text) => {
        return(
            <h1 style={{color:'#1C83B0',fontFamily:'Verdana',fontWeight:400, textAlign:this.alignText}}>{text}</h1>
        )
    }

    //creates percentage text
    createPercentage = (text) => {
        return(
            <h1 style={{color:'#1C83B0',fontSize:55,margin:0,fontWeight:600,fontFamily:'Verdana', textAlign:this.alignText}}>{text}</h1>
        )
    }

    //creates normal text
    createText = (text) => {
        return(
            <p style={{color:'#1C83B0',fontFamily:'Arial', wordWrap:'break-word',maxWidth:'35vh',fontWeight:300, textAlign:this.alignText}}>{text}</p>
        )
    }

    render(){
        return(
            <div>
                {this.components}
            </div>
        )
    }

}
