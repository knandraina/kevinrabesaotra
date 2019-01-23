import React, { Component } from 'react';
import Chart from './Component/chart'
import ChartContinent from './Component/Chartcontinent'
import Detailed from "./Component/Detailed"
import Horns from "./Component/horns"
import { Switch, Route, Redirect } from "react-router-dom";
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isLoading: true,
      isAfrica: false,
      isAsia: false,
      africaAnimals: null,
      asiaAnimals: null,
      page: false,
      redirection: null,
      continent : null,
      horns : null
    }
  }

  componentDidMount = () => {
    this.setState({ isLoading: true })
    axios.get('http://localhost:5000/api/all-data')
      .then(data => {
        this.setState({
          data: data.data.data,
          isLoading: false,
          // africaAnimal: data.data.africaAnimal,
          // africaAnimals: null,
          // asiaAnimal: data.data.asiaAnimal,
          // asiaAnimals : null,
          // counts: data.data.counts,
          // countsAfrica: data.data.countsAfrica,
          // countsAsia: data.data.countsAsia

        })
      })
  }

  AsiaorAfrica = (asiaorafrica) => {
    console.log(asiaorafrica)
    if (asiaorafrica === "isAfrica") {
      this.setState({
        isAfrica: true
      })
    } else if (asiaorafrica === "isAsia") {
      this.setState({
        isAsia: true
      })
    } else {
      this.setState({
        isAsia: true,
        isAfrica: true
      })
    }
  }

  redirection = (e, continent) => {
    this.setState({
      redirection: e,
      continent : continent
    })
  }

  hornRedirection = e => {
console.log(e)
    this.setState({
      horns : e
    })
  }

  render() {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    } else {
      return (
        <div>
          <Switch>
            <Route
              exact path="/"
              render={() => {
                if (this.state.isAfrica && !this.state.isAsia) {
                  return <Redirect to="/africa" />
                } else if (this.state.isAsia && !this.state.isAfrica) {
                  return <Redirect to="/asia" />
                } else if (this.state.isAfrica && this.state.isAsia) {
                  return <Redirect to="/comparison" />
                }else if (this.state.horns != null){
                  return <Redirect to ={`/${this.state.horns}`}/>
                } else {
                  return <Chart
                    allData={this.state.data}
                    AfricaorAsia={this.AsiaorAfrica}
                    horns={this.hornRedirection}
                    
                  />
                }
              }
              }
            />
                <Route
              path="/:continent/:horns"
              render={() => {
                return <Detailed
                  isAfrica={this.state.isAfrica}
                  isAsia={this.state.isAsia}
                  isLoading={this.state.isLoading}
                  redirect={this.redirection}
                  continent={this.state.continent}
                />

              }
              }
            />
             <Route
              path="/africa"
              render={() =>
                this.state.redirection != null ?
                  <Redirect to={`/${this.state.continent}/${this.state.redirection}`} /> :
                  <ChartContinent 
                  isAfrica={this.state.isAfrica}
                  isAsia={this.state.isAsia}
                  isLoading={this.state.isLoading}
                  redirect={this.redirection}
                  />
              }
            />
            <Route
              path="/asia"
              render={() =>
                this.state.redirection != null ?
                  <Redirect to={`/${this.state.continent}/${this.state.redirection}`} /> :
                  <ChartContinent 
                  isAfrica={this.state.isAfrica}
                  isAsia={this.state.isAsia}
                  isLoading={this.state.isLoading}
                  redirect={this.redirection}
                  />
              }
            />         
          <Route
              path="/comparison"
              render={() => {
                return <ChartContinent
                  isAfrica={this.state.isAfrica}
                  isAsia={this.state.isAsia}
                  isLoading={this.state.isLoading}
                  redirect={this.redirection}
                />

              }
              }
            />
             <Route 
            path="/:horns"
            render={() => {
              return <Horns
              />
            }}
            />
          </Switch>

        </div>
      );
    }
  }
}


export default App;
