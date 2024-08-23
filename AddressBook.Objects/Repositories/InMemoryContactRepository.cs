using AddressBook.Objects.Interfaces;
using AddressBook.Objects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBook.Objects.Repositories
{

    public class InMemoryContactRepository : IContactRepository
    {
        private readonly List<Contact> _contacts = new();
        private int _nextId = 1;

        public IEnumerable<Contact> GetAll() => _contacts;

        public Contact GetById(int id_)
        {
            Contact? contact = _contacts.FirstOrDefault(c => c.Id == id_);

            return contact ?? throw new KeyNotFoundException($"Contact with ID {id_} not found.");
        }

        public void Add(Contact contact_)
        {
            ArgumentNullException.ThrowIfNull(contact_);

            contact_.Id = _nextId++;
            _contacts.Add(contact_);
        }

        public void Update(Contact contact_)
        {
            ArgumentNullException.ThrowIfNull(contact_);

            Contact? existing = _contacts.FirstOrDefault(c => c.Id == contact_.Id);

            if (existing == null)
            {
                throw new KeyNotFoundException($"Contact with ID {contact_.Id} not found.");
            }

            existing.FirstName = contact_.FirstName;
            existing.LastName = contact_.LastName;
            existing.Email = contact_.Email;
            existing.Phone = contact_.Phone;
        }

        public void Delete(int id_)
        {
            Contact? contact = _contacts.FirstOrDefault(c => c.Id == id_);

            if (contact == null)
            {
                throw new KeyNotFoundException($"Contact with ID {id_} not found.");
            }

            _contacts.Remove(contact);
        }
    }

}
