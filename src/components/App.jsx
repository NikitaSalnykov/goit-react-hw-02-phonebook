import { number } from "prop-types";
import React, { Component } from "react";
import Form from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import Notiflix from 'notiflix';



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


    // if (!this.state.name.trim() && !this.state.number.trim()) {
    //   console.log("error");
    //   return
    // }
    

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
    Notiflix.Notify.success('Contact added successfully')
  }

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
 