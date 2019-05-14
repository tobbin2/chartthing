import * as React from 'react'

export class ArrowComponent extends React.Component{

    render(){
        return(
            <div>
                <h1>{this.props.data.header}</h1>
                <p>{this.props.data.text}</p>
            </div>
        )
    }

}
