import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './App.css';
import axios from 'axios';
import Post from './Post';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [] 
    };
  }

  componentWillMount() {
    axios
      .get('http://localhost:5000/api/projects')
      .then(response => {

        this.setState({ projects: [...response.data] });
        console.log(response.data);
        console.log(this.state.projects);
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  }

  render() {
    return (
      <div>
        <Row>
        {this.state.projects.map(post =>
            <Col xs="4" key={post.id}>
              <Post
              key={post.id} 
              id={post.id}
              title={post.name}
              body={post.description}
              />
            </Col>)
        }
        </Row>
      </div>
    );
  }
}

export default App;