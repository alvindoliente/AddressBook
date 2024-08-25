import React, { useState } from 'react';
import { Contact as ContactType } from '../types';

interface ContactFormProps {
  contact?: ContactType;
  onSave: (contact: ContactType) => void;
}

// const ContactForm: React.FC<ContactFormProps> = ({ contact, onSave }) => {
  export default function ContactForm({ contact, onSave } : ContactFormProps) {
    // const Contact: React.FC<ContactProps> = ({ contact, onEdit, onDelete }) => (
  const [formState, setFormState] = useState<ContactType>(
    contact || { Id: 0, FirstName: '', LastName: '', Email: '', Phone: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="mb-4" key={formState.Id}>
      <div className="mb-3">
        <label className="form-label">FirstName</label>
        <input
          name="FirstName"
          value={formState.FirstName}
          onChange={handleChange}
          className="form-control"
          placeholder="FirstName"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">LastName</label>
        <input
          name="LastName"
          value={formState.LastName}
          onChange={handleChange}
          className="form-control"
          placeholder="LastName"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          name="Email"
          value={formState.Email}
          onChange={handleChange}
          className="form-control"
          placeholder="Email"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          name="Phone"
          value={formState.Phone}
          onChange={handleChange}
          className="form-control"
          placeholder="Phone"
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Save
      </button>
    </form>
    </>
  )
}