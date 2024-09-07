    import React ,{Component} from 'react'; 
      import LineChart from 'react-linechart';
 


    export default class LinePlot extends Component {


         constructor(props){
              super(props);
              
            }


    render() {
        const data = [
            {                                   
                color: "steelblue", 
                points: this.props.plotdata,
            }
        ];
        return (
            <div>
                <div className="App">
                    <h1>Trend line</h1>
                    <LineChart 
                     id= {this.props.title}
                        width={400}
                        height={400}
                        data={data}
                    />
                </div>              
            </div>
        );
    }
}