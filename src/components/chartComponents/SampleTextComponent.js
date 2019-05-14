import * as React from 'react'

export class SampleTextComponent extends React.Component{

    components = null
    constructor(props){
        super(props)
        console.log("inside SampleTextComponent ", this.props.data)

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
            <h1 style={{fontFamily:'Verdana',marginTop:0,fontWeight:700}}>{text}</h1>
        )
    }

    createPercentage = (text) => {
        return(
            <h1 style={{fontSize:65,margin:0,fontWeight:700,fontFamily:'Verdana'}}>{text}</h1>
        )
    }

    createText = (text) => {
        return(
            <p style={{color:'blue',fontFamily:'Verdana'}}>{text}</p>
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
