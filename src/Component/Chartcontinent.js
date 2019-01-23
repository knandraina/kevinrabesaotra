import React, { Component } from 'react'
import axios from 'axios'
import { BarChart, CustomBarLabel, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class ChartContinent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            africalAnimals: null,
            asiaAnimals: null,
            isLoading: true,
            isAfrica: false,
            isAsia: false,
            redirect : null,
            continent : null
        }
    }

    componentDidMount =() => {
        if (window.location.pathname === "/africa"){
            axios.get("http://localhost:5000/api/africa-data")
            .then(data => {
                console.log(data)
                this.setState({
                    isAfrica : !this.state.isAfrica,
                    africaAnimals : data.data,
                    isLoading : false
                })
            }) 
        } else if (window.location.pathname === "/asia"){
            axios.get("http://localhost:5000/api/asia-data")
            .then(data => {
                this.setState({
                    isAsia : !this.state.isAsia,
                    asiaAnimals : data.data,
                    isLoading : false
                })
            }) 
        } else if (window.location.pathname === "/comparison") {
            axios.get("http://localhost:5000/api/asia-data")
            .then(data => {
                this.setState({
                    isAsia : !this.state.isAsia,
                    asiaAnimals : data.data,
                    isLoading : false
                })
            }) 
            axios.get("http://localhost:5000/api/africa-data")
            .then(data => {
                this.setState({
                    isAfrica : !this.state.isAfrica,
                    africaAnimals : data.data,
                    isLoading : false
                })
            }) 

        }
    }

    moreInformation = (e) => {
        console.log(e)
        var continent = window.location.pathname.split("/")
            continent = continent.slice(1)
        this.setState({
            redirect : e.horns
        }, () => this.setState({
            continent : continent
        }, () => this.props.redirect(e.horns, this.state.continent[0]) ))
    }
  

    group = (arr) => {
        const reduced = arr.reduce((acc, curr) => {
            const text = curr.horns;
            acc[text] = acc[text] || 0;
            acc[text]++;
            return acc;
        }, {});
        return Object.getOwnPropertyNames(reduced).map((prop) => ({ horns: prop, count: reduced[prop] }));
    };




    render() {
        if (this.state.isLoading) {
            return <p>Loading this page ...</p>;
        } else {
     if (this.state.isAfrica && !this.state.isAsia) {
                var uniqueAfrica = this.state.africaAnimals.map((data, i) => { return { "horns": data.horns } })
                var africaData = this.group(uniqueAfrica)
                return (
                    <div>
                        <p>Kudus in Africa ! Don't hesitate to click on bar to discover more about them ! </p>
                        <BarChart width={800} height={200} data={africaData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="horns" />
                            <YAxis dataKey="count" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#98AEEB" onClick={(e) => this.moreInformation(e)}/>
                        </BarChart>
                    </div>
                )
            } else if (this.state.isAsia && !this.state.isAfrica) {
                var uniqueAsia = this.state.asiaAnimals.map((data, i) => { return { "horns": data.horns } })
                var AsiaData = this.group(uniqueAsia)
                return (
                    <div>
                        <p>Kudus in Asia ! Don't hesitate to click on bar to discover more about them ! </p>
                        <BarChart width={800} height={200} data={AsiaData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="horns" />
                            <YAxis dataKey="count" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#98AEEB" onClick={(e) => this.moreInformation(e)} />
                        </BarChart>
                    </div>
                )
            } else if (this.state.isAsia && this.state.isAfrica) {
                var uniqueAsia = this.state.asiaAnimals.map((data, i) => { return { "horns": data.horns } })
                var AsiaData = this.group(uniqueAsia)
                var uniqueAfrica = this.state.africaAnimals.map((data, i) => { return { "horns": data.horns } })
                var africaData = this.group(uniqueAfrica)
                return (
                    <div>
                        <p>Just to compare kudu's species between continent ! As you can there are more Kudus in Africa ! </p>
                        <br></br>
                        <p>ASIA</p>
                        <BarChart width={800} height={200} data={AsiaData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="horns" />
                            <YAxis dataKey="count" />
                            <Tooltip />
                            <Legend/>
                            <Bar dataKey="count" fill="#98AEEB" />
                        </BarChart>

                        <p>AFRICA</p>
                        <BarChart width={800} height={200} data={africaData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="horns" />
                            <YAxis dataKey="count" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#98AEEB" name="africa" onClick={(e) => this.moreInformation(e)}/>
                        </BarChart>
                    </div>
                )
            } else {
                return(
                    <div>
                        <BarChart width={800} height={200} data={africaData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="horns" />
                            <YAxis dataKey="count" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#98AEEB" />
                        </BarChart>
                    </div>

                )
            }
        }

    }
}

export default ChartContinent;