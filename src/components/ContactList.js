import React, { useState } from 'react';
import './ContactList.css';

const ContactList = ({ contacts, onDelete, onAdd, onEdit, editedContact, setEditedContact }) => {
  const handleEditClick = (contact) => {
    setEditedContact({ ...contact });
  };

  const handleEditSave = () => {
    onEdit(editedContact);
    setEditedContact({ id: null, name: '', phone: '' });
  };

  const handleEditCancel = () => {
    setEditedContact({ id: null, name: '', phone: '' });
  };

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
            <i className="material-icons edit" onClick={() => handleEditClick(contact)}>edit</i>
            <i className="material-icons delete" onClick={() => onDelete(contact.id)}>delete</i>
          </div>
        </div>
      ))}

      <div className="add-btn-container">
        <button className="btn-floating btn-large red add-btn" onClick={onAdd}>
          <i className="large material-icons">add</i>
        </button>
      </div>

      {editedContact.id !== null && (
        <div className="edit-form">
          <h2>Edit Contact</h2>
          <input
            type="text"
            placeholder="Name"
            value={editedContact.name}
            onChange={(e) => setEditedContact({ ...editedContact, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone"
            value={editedContact.phone}
            onChange={(e) => setEditedContact({ ...editedContact, phone: e.target.value })}
          />
          <button onClick={handleEditSave}>Save</button>
          <button onClick={handleEditCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ContactList;


