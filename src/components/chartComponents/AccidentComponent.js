import * as React from "react";
import { Column, Row } from 'simple-flexbox'

const textStyleClass = {
    color:'#1C83B0',
    fontFamily:'Lucida Console',
    fontWeight:1500,
    width:'100%',
    marginBottom:'0',
    marginTop:"0"
}

export class AccidentComponent extends React.Component{

    _data = {}
    months = ["Jan", "Feb", "Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]
    year = ["2019"]
    amountOfNodes = 0

    constructor(props) {
        super(props);
            
        //loops through amount of values, appends color for each and changes amountOfNodes to represent length of xAxis. 
        for(let i= 0 ; i < this.props.data.data.length;i++){
          if(this.props.data.data[i].graphData.length > this.amountOfNodes)
            this.amountOfNodes = this.props.data.data[i].graphData.length
        }

    //appends data to public variabe _data, which is the data of the graph. (loops through object sent in)
    this._data = {
      labels: this.props.data.labels !== undefined ? this.props.data.labels : this.months.slice(0,this.amountOfNodes+1),       
      datasets: [{
        data:
        this.props.data.graphData        
        }]
  }  
  
}  
      
    createGraph = () => {

      var sumObject = []
      
      for(let obj of this.props.data.data){
        if(sumObject.length < obj.graphData.length)
         sumObject.push(obj.graphData)
      }   
      console.log(sumObject.sumObject)

        return(
          <div>
            <h3>{this.props.data.labels !== undefined ? this.props.data.labels : this.months.slice(0,this.amountOfNodes+1)}</h3>
            <p>{sumObject } </p>
          </div>
          
        ) 
    }

    createHeader = (text) => {
      return(
          <Row>
              <h2 style={textStyleClass}>{text}</h2>
          </Row>
      )
    }
  
    //creates the summary on the right side
    createSummary = () => {
      
      let lastObject = []

      for(let obj of this.props.data.data){
        if(lastObject.length < obj.graphData.length)
         lastObject = obj.graphData    
      }  

      let achieved = lastObject[this.amountOfNodes - 1]
      let goal = this.props.data.goalGraphData[this.amountOfNodes - 1]

      let styles = {}
  
      //reached goal true, else false
      if(achieved <= goal)
        styles = {color:'green',textAlign:'center',margin:30,fontFamily:'Arial Black'}
      else 
        styles= {color:'red',textAlign:'center',margin:30, fontFamily:'Arial Black'}

        return(
            <div style={styles}>
              <h1>{this.months[this.amountOfNodes-1]}</h1>
              <p>{achieved + " of " + goal} </p>
            </div>
            
          )    
    }
  
    render() {
        return(
          <Row>
            <Column>
                {this.props.data.header !== undefined ? this.createHeader(this.props.data.header) : null}
                <Row>              
                    <Column justifyContent="center"  >
                <div style={{marginTop: '40px', textAlign: 'center', fontFamily:'Verdana'}}>
                      {this.createGraph()}
                </div>                 
                </Column>
                </Row>
            </Column>
            <Column justifyContent="center">
              {this.createSummary()}
            </Column>
          </Row>
        )



    }
}


