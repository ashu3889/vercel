import React ,{Component} from 'react';	
import SearchField from "react-search-field";
import axios from 'axios';


export default class SearchDropdown extends Component {


   constructor(props){
        super(props);
        this.state={
            selected : 0,
            text : null,
            resultData : [],
            value : null,
        }
        
    }

    onChange = () => {
            var searchText = this.state.text;
            let url = `https://tvc4.forexpros.com/d37b8009223b8fa50dfb01e7ea5dc62e/1587473259/1/1/8/search?limit=30&query=${searchText}&type=&exchange=`;
            axios({
                   method: 'get',
                   url: url,
                   timeout: 1000 * 300, // Wait for 5 seconds
            })
            .then(response => {
                this.setState({
                    resultData: response.data,
                })
            })
            .catch((error) => {
                console.log('Error root cause 1...' + error);
            });
    }

    setText = (event) => {
        this.setState({
            text : event,
        })
    }

    selectedStock = (event ) => {
        this.setState({value: event.target.value});
        this.props.setSelectedStock(event.target.value , this.state.text);
    }


    render() {
        let num = [1,2,3,4,5];
        var self = this;
        const {resultData, text} = this.state;
    
    return (
        <div style={{ marginBottom : 30}}>
            <h3>Start Awesome</h3>
            {/* {this.renderOption()} */}

            <SearchField
                placeholder="Search..."
                searchText={text}
                classNames="test-class"
                onSearchClick={this.onChange}
                onChange={(event) => this.setText(event)}
            />
            
             { <select
                  style={{width : 100, height : 40, margin : 40 }}
                  name="select" 
                  onChange={(event) => this.selectedStock(event)}
                >
                {resultData.map(function(n) { 
                    return (
                        <option 
                            value={n.ticker}
                        >
                            {n.full_name}
                        </option>);
                })}
            </select> }           

 
        </div>
    );
    }
}