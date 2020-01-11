import React from 'react'
import Link from 'next/link'
import { Form, FormInput, FormGroup, Button, ListGroup, ListGroupItem } from "shards-react";
import LeaderboardObject from "../components/leaderboardObject";
import PageNavbar from "../components/navbar";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { teamName: '', leaderBoard: null, leaderboardGroupItems: null };
        this.addTeam = this.addTeam.bind(this);
    }

    updateInput(e) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({ [target]: value });
    }


    addTeam() {

    }

    async componentDidMount() {
        const teamName = localStorage.getItem('teamName');
        const teamID = localStorage.getItem('teamID');
        const userID = localStorage.getItem('userID');
        this.setState({ teamName });
        console.log(teamName);
        fetch('http://127.0.0.1:8000/api/leaderboard/' + teamID,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                }
            }).then(async (res) => {
                const data = await res.json();
                console.log('just got this data')
                console.log(data)
                this.setState({ leaderBoard: <LeaderboardObject data={data.leaderboard.team} /> });
            }).catch((error) => {
                this.setState({ loading: false });
            });

        console.log('trying to fetch: ' + userID)
        fetch('http://127.0.0.1:8000/api/leaderboard/user/' + userID,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                }
            }).then(async (res) => {
                const data = await res.json();
                this.setState({ leaderboardList: data.leaderboards });
                console.log('leaderboard list is ')
                console.log(data.leaderboards)

                const leaderboardGroupItems = data.leaderboards.map((leaderboard) => {
                    return <ListGroupItem>{leaderboard.name}</ListGroupItem>;
                });
                this.setState({leaderboardGroupItems});

            }).catch((error) => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <html>
                <head>
                    <title> leaderboard </title>
                    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                        crossOrigin="anonymous" />
                </head>
                <body>
                    <PageNavbar></PageNavbar>
                    <div className="sideBar" style={{ height: '100%', width: '20vw' }}>
                        <ListGroup style={{height:'100vh', borderRight: '#212529'}}>
                            {this.state.leaderboardGroupItems}
                        </ListGroup>
                    </div>
                    <div className="container">
                        <div style={{ marginBottom: '1px solid gray', minHeight: '5vh', marginTop: 30 }} className="row text-center">
                            <h3>{this.state.teamName}</h3>
                        </div>
                        <div style={{ marginTop: '4vh' }}>
                            {this.state.leaderBoard}
                        </div>
                    </div>

                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                        crossOrigin="anonymous"></script>
                </body>
            </html>
        );
    }
}

export default Leaderboard
