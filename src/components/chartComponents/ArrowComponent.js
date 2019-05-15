import * as React from 'react'

export class ArrowComponent extends React.Component{

    render(){
        return(
            <div>
                <h2>{this.props.data.header}</h2>
                <p>{this.props.data.text}</p>
            </div>
        )
    }

}
