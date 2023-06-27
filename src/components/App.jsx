import { number } from "prop-types";
import React, { Component } from "react";
import Form from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import Notiflix from 'notiflix';
import { Filter } from "./Filter/Filter";



export class App extends Component {

  state = {
  contacts: [],
  name: '',
  number: '',
  filterContacts: null,
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

    if (this.state.contacts.some(contact => contact.name.toLowerCase() === this.state.name.toLowerCase())) {
      Notiflix.Notify.info(`${this.state.name} is already in contcts`)
      return
    }
    
    const newContact = {
      name: this.state.name,
      number: this.state.number,
      id: Date.now()
    };



    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      filterContacts: [...prevState.contacts, newContact],
      name: '',
      number: ''
    }));
    Notiflix.Notify.success('Contact added successfully')
  }
  
handleFilter = ({ target }) => {
  const { contacts } = this.state;
  const filterValue = target.value.toLowerCase().trim();

  const filteredContacts = contacts.filter(
    contact => contact.name.toLowerCase().includes(filterValue)
  );

  if (filteredContacts.length === 0) {
    Notiflix.Notify.info('No search');
  }

  this.setState({ filterContacts: filteredContacts });
}
    

  
  onDeleteBtn = (id) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
      filterContacts: [...prevState.filterContacts.filter(contact => contact.id !== id)],
    }))
  }



  
render() {
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Form onSubmit={this.onSubmit} handleChange={this.handleChange} name={this.state.name} number={this.state.number} />
          
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilter}/>
        <ContactList contacts={this.state.filterContacts ? this.state.filterContacts : this.state.contacts} onDeleteBtn={this.onDeleteBtn} />
      </div>
    </>
  );
}
}
