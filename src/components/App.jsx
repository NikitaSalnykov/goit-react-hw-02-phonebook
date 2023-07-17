
import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import Notiflix from 'notiflix';
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid'

export class App extends Component {

  state = {
  contacts: [],
  filter: [],
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
    filter: [...prevState.contacts, newContact],
  }));

  Notiflix.Notify.success('Contact added successfully');
  };
  
onDeleteBtn = (id) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
      filter: [...prevState.filter.filter(contact => contact.id !== id)],
    }))
  }

handleFilter = (filteredContacts) => {
  this.setState({ contacts: filteredContacts });
  };


render() {
  return (
    <>
      <div>
        <h2>Phonebook</h2>
      
        <ContactForm onSubmit={this.handleFormSubmit} contacts={ this.state.contacts } />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onFilter={this.handleFilter} />
        <ContactList contacts={this.state.contacts} onDeleteBtn={this.onDeleteBtn} />

      </div>
    </>
  );
}
}
