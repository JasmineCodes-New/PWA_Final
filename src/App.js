import React, { useState } from 'react';
import ContactList from './components/ContactList';
import './App.css'; 

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Burges', phone: '+13423523' },
    { id: 2, name: 'Yogesh', phone: '+1989234567' },
    // ... more contacts
  ]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [editedContact, setEditedContact] = useState({ id: null, name: '', phone: '' });

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAdd = () => {
    if (newContact.name && newContact.phone) {
      const updatedContacts = [...contacts];
      updatedContacts.push({
        id: Math.random(), 
        name: newContact.name,
        phone: newContact.phone,
      });
      setContacts(updatedContacts);
      setNewContact({ name: '', phone: '' });
      toggleForm();
    } else {
      alert('Please fill out both name and phone number.');
    }
  };

  const handleEdit = () => {
    if (editedContact.name && editedContact.phone) {
      const updatedContacts = contacts.map(contact =>
        contact.id === editedContact.id ? editedContact : contact
      );
      setContacts(updatedContacts);
      setEditedContact({ id: null, name: '', phone: '' });
    } else {
      alert('Please fill out both name and phone number.');
    }
  };

  return (
    <div className="App">
      <nav className={`sidenav ${isNavOpen ? 'open' : ''}`}>
        <button onClick={toggleNav} className="closebtn">&times;</button>
        <a href="#">Home</a>
        <a href="#">Contacts</a>
      </nav>

      <button onClick={toggleNav} className="sidenav-trigger">
        <span className="material-icons">menu</span>
      </button>

      <div className="main-content">
        <ContactList
          contacts={contacts}
          onDelete={handleDelete}
          onAdd={toggleForm}
          onEdit={handleEdit}
          editedContact={editedContact}
          setEditedContact={setEditedContact}
        />

        {isFormOpen && (
          <div className="contact-form">
            <h2>Add Contact</h2>
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />
            <button onClick={handleAdd}>Add</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;





