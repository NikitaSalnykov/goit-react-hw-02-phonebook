import { number } from "prop-types";
import React, { Component } from "react";
import Form from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";




export class App extends Component {

  state = {
  contacts: [],
  name: '',
  number: ''
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

 
  onSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      name: this.state.name,
      number: this.state.number,
      id: Date.now()
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: ''
    }));
  };

  onDeleteBtn = (id) => {
    this.setState(prevState => ({
    contacts: [...prevState.contacts.filter(contact => contact.id !== id)]
    }))
  }

  
  render() { 
    return (
      <>
        <div>
          <h2>Phonebook</h2>
          <Form onSubmit={this.onSubmit} handleChange={this.handleChange} name={this.state.name} number={this.state.number} />
          
          <h2>Contacts</h2>
          <ContactList contacts={this.state.contacts} onDeleteBtn={this.onDeleteBtn}/>
      </div>
      </>
     );
  }
}
 