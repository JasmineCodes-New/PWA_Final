import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import { addContact, getAllContacts, updateContact, deleteContact } from './indexedDB'; // Import IndexedDB functions

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [editedContact, setEditedContact] = useState({ id: null, name: '', phone: '' });

  useEffect(() => {
    // Load contacts from IndexedDB when the component mounts
    getAllContacts().then((storedContacts) => {
      setContacts(storedContacts);
    });
  }, []);

  const handleAdd = () => {
    if (newContact.name && newContact.phone) {
      addContact(newContact)
        .then(() => {
          setContacts([...contacts, newContact]);
          setNewContact({ name: '', phone: '' });
          setIsFormOpen(false); // Close the form after adding a contact
        })
        .catch((error) => {
          console.error('Error adding contact to IndexedDB:', error);
        });
    } else {
      alert('Please fill out both name and phone number.');
    }
  };

  const handleEdit = () => {
    if (editedContact.name && editedContact.phone) {
      updateContact(editedContact)
        .then(() => {
          const updatedContacts = contacts.map((contact) =>
            contact.id === editedContact.id ? editedContact : contact
          );
          setContacts(updatedContacts);
          setEditedContact({ id: null, name: '', phone: '' });
        })
        .catch((error) => {
          console.error('Error updating contact in IndexedDB:', error);
        });
    } else {
      alert('Please fill out both name and phone number.');
    }
  };

  const handleDelete = (id) => {
    deleteContact(id)
      .then(() => {
        const updatedContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(updatedContacts);
      })
      .catch((error) => {
        console.error('Error deleting contact from IndexedDB:', error);
      });
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the isNavOpen state
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="App">
      <nav className={`sidenav ${isNavOpen ? 'open' : ''}`}>
        {/* Your navigation content */}
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
            {/* Your form for adding a contact */}
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










