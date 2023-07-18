
import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import Notiflix from 'notiflix';
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid'

export class App extends Component {

  state = {
  contacts: [],
  filter: '',
  }

  handleFormSubmit = (formData) => {
  const { name, number } = formData;
  const newContact = {
    name: name,
    number: number,
    id: nanoid()
  };

  this.setState(prevState => ({
    contacts: [...prevState.contacts, newContact],
  }));

  Notiflix.Notify.success('Contact added successfully');
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value })
  }

  getFilteredContacts = () => {
    const { filter, contacts } = this.state 
    
    const normilizedFilterValue = filter.toLowerCase();
    return contacts.filter(
      contact => contact.name.toLowerCase().includes(normilizedFilterValue)
    );
  }
  
  onDeleteBtn = (id) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
    }))
  }

render() {
  return (
    <>
      <div>
        <h2>Phonebook</h2>
      
        <ContactForm onSubmit={this.handleFormSubmit} contacts={ this.state.contacts } />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleFilter={this.handleFilter} />
        <ContactList contacts={this.getFilteredContacts()} onDeleteBtn={this.onDeleteBtn} />

      </div>
    </>
  );
}
}
