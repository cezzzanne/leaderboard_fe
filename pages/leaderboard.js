import React from 'react'
import Link from 'next/link'
<<<<<<< HEAD
import {Form, FormInput, FormGroup, Button, ModalHeader, ModalBody, ModalFooter, Modal} from "shards-react";
=======
import { Form, FormInput, FormGroup, Button, ListGroup, ListGroupItem } from "shards-react";
>>>>>>> 36a6cb7792ad6d6d1564c882909a39556c661a47
import LeaderboardObject from "../components/leaderboardObject";
import PageNavbar from "../components/navbar";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state = {teamName: '', leaderBoard: null, lbname: '', addBoardModal: false};
        this.addBoard = this.addBoard.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({addBoardModal: true});
=======
        this.state = { teamName: '', leaderBoard: null, leaderboardGroupItems: null };
        this.addTeam = this.addTeam.bind(this);
>>>>>>> 36a6cb7792ad6d6d1564c882909a39556c661a47
    }

    updateInput(e) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({ [target]: value });
    }



    async addBoard() {
        const teamID = await localStorage.getItem('teamID');
        fetch('http://127.0.0.1:8000/api/leaderboard/add',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    teamID,
                })
            }).then(async (res) => {
            const data = await res.json();
            const leaderBoards = data.leaderboard.map((player) => {
                return <LeaderboardObject data={player}/>
            });
            this.setState({leaderBoard: leaderBoards, addBoardModal: false})
        }).catch((error) => {

        });
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
<<<<<<< HEAD
            const data = await res.json();
            console.log(data);
            const leaderBoards = this.props.data.leaderboard.map((player) => {
                return <LeaderboardObject data={data}/>
            });
            this.setState({leaderBoard: leaderBoards});
        }).catch((error) => {
            this.setState({loading: false});
        });
    }
=======
                const data = await res.json();
                console.log('just got this data')
                console.log(data)
                this.setState({ leaderBoard: <LeaderboardObject data={data.leaderboard.team} /> });
            }).catch((error) => {
                this.setState({ loading: false });
            });
>>>>>>> 36a6cb7792ad6d6d1564c882909a39556c661a47

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
<<<<<<< HEAD
            <head>
                <title> leaderboard </title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                      crossOrigin="anonymous" />
            </head>
            <body>
          <div className="container">
              <Modal open={this.state.addBoardModal} toggle={this.toggle}>
                  <ModalHeader>Add a leaderboard</ModalHeader>
                  <ModalBody>
                      <Form style={{maxWidth: '14vw'}}>
                          <FormGroup>
                              <label htmlFor="#lbname">Name</label>
                              <FormInput type="text" onChange={this.updateInput} value={this.state.lbname} id="lbname" placeholder="Name of leaderboard" />
                          </FormGroup>
                      </Form>
                  </ModalBody>
                  <ModalFooter>
                      <Button className="float-right" onClick={this.addBoard}  theme="info">Add</Button>
                  </ModalFooter>
              </Modal>
              <div style={{marginBottom: '1px solid gray', minHeight: '5vh', marginTop: 30}} className="row text-center">
                  <h3>{this.state.teamName} <a href="#" onClick={this.toggle}>+</a></h3>
              </div>
              <div style={{marginTop: '4vh'}}>
                  { this.state.leaderBoard}
              </div>
          </div>

          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
                  integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
                  crossOrigin="anonymous"></script>
            </body>
=======
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
>>>>>>> 36a6cb7792ad6d6d1564c882909a39556c661a47
            </html>
        );
    }
}

export default Leaderboard
