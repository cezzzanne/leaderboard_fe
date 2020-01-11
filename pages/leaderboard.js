import React from 'react'
import Link from 'next/link'
import { Form, FormInput, FormGroup, Button, ModalHeader, ModalBody, ModalFooter, Modal, ListGroup, ListGroupItem } from "shards-react";
import LeaderboardObject from "../components/leaderboardObject";
import PageNavbar from "../components/navbar";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { teamName: '', leaderBoard: null, lbname: '', addBoardModal: false, currentBoard: null };
        this.addBoard = this.addBoard.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.toggle = this.toggle.bind(this);
        this.goToBoard = this.goToBoard.bind(this);
    }

    toggle() {
        this.setState({ addBoardModal: true });
    }

    updateInput(e) {
        const element = event.target;
        const target = element.id;
        const value = element.value;
        this.setState({ [target]: value });
    }

    goToBoard(lid) {
        console.log('this');
        fetch('http://127.0.0.1:8000/api/leaderboard/' + lid.toString().trim(),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                }
            }).then(async (res) => {
                const data = await res.json();
                console.log(data);
                this.setState({ currentBoard: <LeaderboardObject data={data.leaderboard}/>})
        }).catch((error) => {

        });
    }



    async addBoard() {
        const lbname = this.state.lbname;
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
                    lbname
                })
            }).then(async (res) => {
            const data = await res.json();
            this.setState({ currentBoard: <LeaderboardObject data={data}/>, addBoardModal: false});

        }).catch((error) => {

        });
    }


    async componentDidMount() {
        const teamName = localStorage.getItem('teamName');
        const teamID = localStorage.getItem('teamID');
        const userID = localStorage.getItem('userID');
        this.setState({ teamName });
        console.log('trying to fetch: ' + userID);
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
            console.log('leaderboard list is ');
            console.log(data.leaderboards);

            const leaderboardGroupItems = data.leaderboards.map((leaderboard) => {
                return <ListGroupItem onClick={()=> {this.goToBoard(leaderboard.id)}}>  {leaderboard.name} </ListGroupItem>;
            });
            this.setState({ leaderboardGroupItems });

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
            <div className="row">
                <div className="col-4">
            <div className="sideBar" style={{width: '20vw' }}>
                <ListGroup style={{borderRight: '#212529' }}>
                    {this.state.leaderboardGroupItems}
                    <ListGroupItem><a href="#" onClick={this.toggle}>Add board</a></ListGroupItem>

                </ListGroup>
            </div>
                </div>
                <div className="col-8">
                {this.state.currentBoard}

                <Modal open={this.state.addBoardModal} toggle={this.toggle}>
                    <ModalHeader>Add a leaderboard</ModalHeader>
                    <ModalBody>
                        <Form style={{ maxWidth: '14vw' }}>
                            <FormGroup>
                                <label htmlFor="#lbname">Name</label>
                                <FormInput type="text" onChange={this.updateInput} value={this.state.lbname} id="lbname" placeholder="Name of leaderboard" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="float-right" onClick={this.addBoard} theme="info">Add</Button>
                    </ModalFooter>
                </Modal>
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