import PropTypes from 'prop-types'

export const ContactList = ({contacts, onDeleteBtn}) => {
  
  return (
    <ul>
      {contacts.map((contact) => {
        return (
          <li key={contact.id}>
            <p>Name: {contact.name}</p>
            <p>Tel.: {contact.number ? contact.number : "none"}</p>
            <button onClick={() => onDeleteBtn(contact.id)}>Delete</button>
          </li>
        )

      })}
    </ul>
  )
}
