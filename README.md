plugins:{
    datalabels:{
        align:'right',
        anchor:'end',
        formatter: (value, ctx) => {
            if(ctx.datasetIndex == 0){
                values[ctx.dataIndex] = Number(value)
            }else if(ctx.datasetIndex == 2){
                return values[ctx.dataIndex] += Number(value)
            }
            return null

        }
    }
}
maximumNode = 0
let values = {}


if(this.maximumNode < this.props.data.graphData[i])
    this.maximumNode = Number(this.props.data.graphData[i])

if(this.maximumNode < this.props.data.goalGraphData[i])
    this.maximumNode = Number(this.props.data.goalGraphData[i])

this.maximumNode += 20
