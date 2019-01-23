import React, { Component } from 'react'
import axios from 'axios'
import { BarChart, CustomBarLabel, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, Icon, Image } from 'semantic-ui-react'
import Axios from 'axios';


class Detailed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            country: null,
            horns: null,
            averageHeight: null,
            averageWeight: null,
            display: false,
            name: null,
            continent: null,
            weight: null,
            height: null,
            picture: null,
            weightHeight : null
        }
    }


    componentDidMount = () => {
        var analysis = window.location.pathname.split("/")
        var country = analysis[1]
        var horns = analysis[2]
        axios.get(`http://localhost:5000/api/${country}/${horns}`, { country }, { horns })
            .then(data => {
                this.setState({
                    data: data.data.data,
                    country: country,
                    horns: horns,
                    averageHeight: data.data.averageHeight,
                    averageWeight: data.data.averageWeight
                })
            })
    }



    moreInformation = (e) => {
        var weightHeight = e.payload.weight / e.payload.height
        this.setState({
            display: !this.state.display,
            name: e.payload.name,
            continent: e.payload.continent,
            height: e.payload.height,
            weight: e.payload.weight,
            picture: e.payload.picture,
            weightHeight : weightHeight
        })
    }

    render() {
        return (
            <div>
                <div>
                    <p>
                        On this chart you can find information about {this.state.horns}'s kudus in {this.state.country}<br></br>
                        Average height : {this.state.averageHeight}<br></br>
                        Average weight : {this.state.averageWeight}
                     </p>
                    <BarChart width={800} height={200} data={this.state.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis dataKey="weight" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="weight" fill="#35469C" onClick={(e) => this.moreInformation(e)} />
                        <Bar dataKey="height" fill="#98AEEB" onClick={(e) => this.moreInformation(e)} />
                    </BarChart>
                </div>
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
                                        Weight/Height : {this.state.weightHeight}
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

export default Detailed;