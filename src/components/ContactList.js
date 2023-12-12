import React from 'react';
import './ContactList.css'; // Assuming you have a ContactList.css in the same folder

const ContactList = ({ contacts, onDelete }) => {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div className="contact-item" key={contact.id}>
          <div className="contact-info">
            <i className="material-icons avatar">account_circle</i>
            <div className="contact-details">
              <div className="contact-name">{contact.name}</div>
              <div className="contact-number">{contact.phone}</div>
            </div>
          </div>
          <div className="contact-actions">
            <i className="material-icons edit" onClick={() => alert('Edit functionality not implemented.')}>edit</i>
            <i className="material-icons delete" onClick={() => onDelete(contact.id)}>delete</i>
          </div>
        </div>
      ))}
      <button className="btn-floating btn-large red add-btn" onClick={() => alert('Add functionality not implemented.')}>
        <i className="large material-icons">add</i>
      </button>
    </div>
  );
};

export default ContactList;
