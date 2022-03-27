import React, { Component} from "react";
import CardList from "./CardList";
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from "./ErrorBoundry";
import './app.css';
//import react from "react";


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            Searchfield: '' 
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(Response => Response.json())
            .then(users => this.setState({ robots: users}));
        
    }

    onSearchChange = (event) => {  
        this.setState({ Searchfield: event.target.value })     
    }

    
    render () { 
        const filteredRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.Searchfield.toLowerCase());
        })
        if(this.state.robots.length === 0) {
            return <h1>Loading</h1>
        } else { 
        return (
            <div className="tc">
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
            );
        }
    }
    
}

export default App;