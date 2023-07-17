import { Input } from 'components/ContactForm/ContactForm.styled'
import PropTypes from 'prop-types'
import Notiflix from 'notiflix';
import React, { Component } from "react";

export class Filter extends Component {
  state = {
      isNotification: false    
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  handleFilter = ({ target }) => {
    const { filter } = this.props;
    const { isNotification } = this.state;
    const filterValue = target.value.toLowerCase().trim();
  
    const filteredContacts = filter.filter(
      contact => contact.name.toLowerCase().includes(filterValue)
    );

    if (filteredContacts.length === 0 && !isNotification) {
      Notiflix.Notify.info('No search');
      this.setState({ isNotification: true })
      setTimeout(() => {
        this.setState({ isNotification: false })
      }, 3000);
    }
    return this.props.onFilter(filteredContacts);
  }

  render() {
    return (
      <div>
        <label style={{ marginRight: '14px' }} htmlFor="filter">Find contacts by name</label>
        <Input type="text" name="input" id="filter" onChange={this.handleFilter} />
      </div>
    )
  }
}