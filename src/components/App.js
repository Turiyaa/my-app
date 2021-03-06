import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { without } from 'lodash';
class App extends Component {

  constructor(){
    super();
    //never modify state directly
    this.state = {
      myAppointments: [],
      lastIndex: 0,
      formDisplay : false
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.testFetch = this.testFetch.bind(this);
  }
toggleForm(){
  this.setState({
    formDisplay : !this.state.formDisplay
  });
}

addAppointment(apt){
  let tempApts = this.state.myAppointments;
  apt.aptId = this.state.lastIndex;
  tempApts.unshift(apt);

  this.setState({
    myAppointments: tempApts,
    lastIndex: this.state.lastIndex + 1
  });
}

deleteAppointment(apt){
  let tempApts = this.state.myAppointments;
  tempApts = without(tempApts, apt);

  this.setState({
  myAppointments : tempApts
});
this.testFetch();
}
  // read data
  componentDidMount(){
    fetch('./data.json')
    .then(response => response.json())
    .then(result => {
      const apts = result.map(item => {
        item.aptId = this.state.lastIndex;
        this.setState({ lastIndex: this.state.lastIndex + 1 });
        return item;
      })
      this.setState({
        myAppointments: apts,
      })
    });
  }

  testFetch(){
  fetch('http://129.3.20.26:1312/SMARTron/rest/answerkey',{
    headers:{
      'mode': 'no-cors'
    }
  })
  .then(response => response.json())
  .then(result => {
    const keys = result.map(item => {
      return item;
    })
  });
}

  render() {

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments formDisplay = {this.state.formDisplay}
                toggleForm = {this.toggleForm}
                addAppointment = {this.addAppointment}/>
                <SearchAppointments/>
                <ListAppointments appointments={this.state.myAppointments}
                deleteAppointment={this.deleteAppointment}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
