import  { useEffect, useState } from 'react';
import Contact from './Contact';
import ContactForm from './ContactForm';
import { Contact as ContactType } from '../types';

export default function Contacts() {
    
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [editingContact, setEditingContact] = useState<ContactType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('calling useEfft');
    fetch('https://localhost:7228/api/contacts')
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setContacts(data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError('Failed to fetch contacts');
      });
  }, []);

  const addContact = (contact: ContactType) => {
    console.log(contact);
    fetch('https://localhost:7228/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    })
      .then(response => response.json())
      .then(newContact => setContacts([...contacts, newContact]));
  };

  const updateContact = (contact: ContactType) => {
    console.log(contact);
    fetch(`https://localhost:7228/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    })
      .then(() => {
        setContacts(contacts.map(c => (c.id === contact.id ? contact : c)));
        setEditingContact(null);
      });
  };

  const deleteContact = (id: number) => {
    console.log(id);
    fetch(`https://localhost:7228/api/contacts/${id}`, { method: 'DELETE' })
      .then(() => setContacts(contacts.filter(c => c.id !== id)));
  };

  return (
    <div className="container mt-4">
      <h1>Contacts</h1>
      {editingContact ? (
        <ContactForm key={editingContact.id} contact={editingContact} onSave={updateContact} />
      ) : (
        <ContactForm onSave={addContact} />
      )}
      {contacts.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditingContact(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No contacts available.</p>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );

}