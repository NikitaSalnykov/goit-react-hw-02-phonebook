import { number } from "prop-types";
import React, { Component } from "react";
import Form from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import Notiflix from 'notiflix';



export class App extends Component {

  state = {
  contacts: [],
  name: '',
  number: '',
  originalContacts: [],
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

 
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.name.trim() && !this.state.number.trim()) {
      Notiflix.Notify.failure('Empty input!')
      return
    }
    
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
  
  handleFilter = ({ target }) => {
    const { contacts, originalContacts } = this.state;
    const filterValue = target.value.toLowerCase();

    const filteredContacts = contacts.filter(
      contact => contact.name.toLowerCase().includes(filterValue)
    );

    this.setState({ originalContacts: filteredContacts });

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
        <label htmlFor="filter">Find contacts by name</label>
        <input type="text" name="input" id="input" onChange={this.handleFilter}/>
        <ContactList contacts={this.state.originalContacts.length > 0 ? this.state.originalContacts : this.state.contacts} onDeleteBtn={this.onDeleteBtn} />
      </div>
    </>
  );
}
}
