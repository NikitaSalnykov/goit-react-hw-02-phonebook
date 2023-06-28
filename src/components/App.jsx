
import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import Notiflix from 'notiflix';
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid'



export class App extends Component {

  state = {
  contacts: [],
  name: '',
  number: '',
    filter: [],
    isNotification: false
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
      id: nanoid()
    };



    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      filter: [...prevState.contacts, newContact],
      name: '',
      number: ''
    }));
    Notiflix.Notify.success('Contact added successfully')
  }
  
handleFilter = ({ target }) => {
  const { filter, isNotification } = this.state;
  const filterValue = target.value.toLowerCase().trim();
  
  const filteredContacts = filter.filter(
    contact => contact.name.toLowerCase().includes(filterValue)
  );

  if (filteredContacts.length === 0 && !isNotification) {
    Notiflix.Notify.info('No search');
    this.setState({ isNotification: true})
    setTimeout(() => {
      this.setState({ isNotification: false})
    }, 3000);
  }
  this.setState({ contacts: filteredContacts});
}
    

  
  onDeleteBtn = (id) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(contact => contact.id !== id)],
      filter: [...prevState.filter.filter(contact => contact.id !== id)],
    }))
  }



  
render() {
  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.onSubmit} handleChange={this.handleChange} name={this.state.name} number={this.state.number} />
          
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilter}/>
        <ContactList contacts={this.state.contacts} onDeleteBtn={this.onDeleteBtn} />

      </div>
    </>
  );
}
}
