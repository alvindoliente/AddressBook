import { Contact as ContactType } from '../types';

interface ContactProps {
  contact: ContactType;
  onEdit: (contact: ContactType) => void;
  onDelete: (id: number) => void;
}


export default function Contact({ contact, onEdit, onDelete } : ContactProps) {
// const Contact: React.FC<ContactProps> = ({ contact, onEdit, onDelete }) => (
  return (
    <>
    <div className="card mb-3">
    <div className="card-body">
      <h5 className="card-title">Contact</h5>
      <p className="card-text">FirstName: {contact.firstName}</p>
      <p className="card-text">LastName: {contact.lastName}</p>
      <p className="card-text">Email: {contact.email}</p>
      <p className="card-text">Phone: {contact.phone}</p>
      <button className="btn btn-primary me-2" onClick={() => onEdit(contact)}>
        Edit
      </button>
      <button className="btn btn-danger" onClick={() => onDelete(contact.id)}>
        Delete
      </button>
    </div>
  </div>
  </>
  )
}

// export default Contact;
