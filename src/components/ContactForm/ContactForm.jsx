import PropTypes from 'prop-types'
import React from 'react';
import {Button, Form, Input} from './ContactForm.styled'

const ContactForm = ({onSubmit, handleChange, name, number}) => {

    return (
      <Form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={name}
          />
          <label htmlFor="tel">Number</label>
          <Input
            id="tel"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
          />
          <Button type="submit">Add contact</Button>
          </div>
          </Form>
           );
  }
 
export default ContactForm;

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
    
}