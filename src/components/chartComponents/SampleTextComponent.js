import * as React from 'react'

export class SampleTextComponent extends React.Component{

    components = null
    alignText = 'left'

    constructor(props){
        super(props)
        if(this.props.data.align)
            this.alignText = this.props.data.align

        this.components = Object.keys(this.props.data).map( (key) => {
            switch(key){
                case 'header':
                    return this.createHeader(this.props.data[key])
                case 'percentage':
                    return this.createPercentage(this.props.data[key])
                case 'text':
                    return this.createText(this.props.data[key])
            }
        })
    }

    createHeader = (text) => {
        return(
            <h1 style={{color:'#1C83B0',fontFamily:'Verdana',marginTop:0,fontWeight:400, textAlign:this.alignText}}>{text}</h1>
        )
    }

    createPercentage = (text) => {
        return(
            <h1 style={{color:'#1C83B0',fontSize:55,margin:0,fontWeight:600,fontFamily:'Verdana', textAlign:this.alignText}}>{text}</h1>
        )
    }

    createText = (text) => {
        
        return(
            <p style={{color:'#1C83B0',fontFamily:'Arial', wordWrap:'break-word',maxWidth:'35vh',fontWeight:300, textAlign:this.alignText}}>{text}</p>
        )
    }

    render(){
        return(
            <div>
             
            </div>
        )
    }

}
