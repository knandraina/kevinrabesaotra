import React, { Component } from 'react'
import axios from 'axios'
import { BarChart, CustomBarLabel, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, Icon, Image } from 'semantic-ui-react'
import Axios from 'axios';

class Horns extends Component {
    constructor(props){
        super(props)
        this.state = {
            data : null,
            horn : null
        }
    }

    componentDidMount = () => {
        var analysis = window.location.pathname.split("/")
            var horns = analysis[1]
            axios.get(`http://localhost:5000/api/${horns}`, {horns})
                .then(data => {
                    this.setState({
                        data : data.data
                    })
                })
    }

    moreInformation = e => {
        this.setState({
            display: !this.state.display,
            name: e.payload.name,
            continent: e.payload.continent,
            height: e.payload.height,
            weight: e.payload.weight,
            picture: e.payload.picture,
        })
    }
    render(){
        return(
            <div>
                <BarChart width={800} height={200} data={this.state.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="weight" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="weight" fill="#35469C" onClick={(e) => this.moreInformation(e)} />
                        <Bar dataKey="height" fill="#98AEEB" onClick={(e) => this.moreInformation(e)} />
                    </BarChart>
                    {this.state.display ?
                    <div>
                        <Card>
                            <div>
                                <Image src={this.state.picture} className="picture" />
                            </div>
                            <div>
                                <Card.Content>
                                    <Card.Header>{this.state.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Lived in {this.state.continent}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Heights : {this.state.height} <br></br>
                                        Weights : {this.state.weight} <br></br>
                                    </Card.Description>
                                </Card.Content>
                            </div>
                        </Card>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default Horns