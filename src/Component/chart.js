import React, { Component } from 'react'

import { BarChart, CustomBarLabel, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from 'semantic-ui-react'



class Chart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            isAfrica: false,
            isAsia: false,
            horns : null
        }

    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        return {
            data: nextProps.allData,
        }
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

    clicked = (e) => {
        if (e.target.name === "isAfrica") {
            this.setState({
                isAfrica: true
            })
        } else if (e.target.name === "isAsia") {
            this.setState({
                isAsia: true
            })
        } else if (e.target.name ==="comparison"){
            this.setState({
                isAsia: true,
                isAfrica : true
            })
        }
        this.props.AfricaorAsia(e.target.name)
    }

    moreinformation = e => {
        this.props.horns(e.payload.horns)
    } 
    render() {
        const uniqueData = this.state.data.map((data, i) => { return { "horns": data.horns } })
        var grouped = this.group(uniqueData)
        return (
            <div className="graph">
           <p> Hello Guys ! It seems you're interested about Mudus ! On this project, you'll learn more about our favorite animals, Mudus !</p>
           <p> Dont hesitate to click on Chart Bar to discover more </p>
                <BarChart width={800} height={200} data={grouped}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="horns" />
                    <YAxis dataKey="count" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#35469C" onClick={(e) => this.moreinformation(e)}/>
                </BarChart>
                <p>This chart represents the Mudus' characteristic around Asia and Africa. The taken characteristic is the horns. Don't hesitate to discover more about those species !</p>
                <div className="button">
                <Button onClick={(e) => this.clicked(e)} className="button-color" name='isAfrica'>Africa</Button>
                <Button onClick={(e) => this.clicked(e)} className="button-color" name='isAsia'>Asia</Button>
                <Button onClick={(e) => this.clicked(e)} className="button-color" name='comparison'>Comparison</Button>
                </div>
            </div>
        )
    }
}








export default Chart;