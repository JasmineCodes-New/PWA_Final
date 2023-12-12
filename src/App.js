import React, { useState } from 'react';
import ContactList from './components/ContactList';
import './App.css'; // Make sure to include your styles

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Burges', phone: '+13423523' },
    { id: 2, name: 'Yogesh', phone: '+1989234567' },
    // ... more contacts
  ]);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleAdd = () => {
    // Implement your add functionality here
    // You can open a form or any other method to add contacts
    // For now, let's just show an alert
    alert('Add functionality not implemented.');
  };

  return (
    <div className="App">
      <nav className={`sidenav ${isNavOpen ? 'open' : ''}`}>
        <button onClick={toggleNav} className="closebtn">&times;</button>
        <a href="#">Home</a>
        <a href="#">Contacts</a>
        {/* ... other navigation links */}
      </nav>

      <button onClick={toggleNav} className="sidenav-trigger">
        <span className="material-icons">menu</span>
      </button>

      <div className="main-content">
        <ContactList contacts={contacts} onDelete={handleDelete} onAdd={handleAdd} />
      </div>
    </div>
  );
};

export default App;



