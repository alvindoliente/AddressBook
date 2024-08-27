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
        private readonly List<Contact> _contacts = new List<Contact>();

        private int _nextId = 1;

        public Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            return Task.FromResult(_contacts.AsEnumerable());
        }

        public Task<Contact> GetContactByIdAsync(int id_)
        {
            //Contact? contact = _contacts.FirstOrDefault(c => c.Id == id_);
            //return contact ?? throw new KeyNotFoundException($"Contact with ID {id_} not found.");
            Contact contact = _contacts.FirstOrDefault(c => c.Id == id_) ?? throw new KeyNotFoundException($"Contact with Id {id_} not found.");
            return Task.FromResult(contact);
        }

        public Task AddContactAsync(Contact contact_)
        {
            contact_.Id = _nextId++;

            if (_contacts.Any(c => c.Id == contact_.Id))
            {
                throw new InvalidOperationException($"A contact with Id {contact_.Id} already exists.");
            }
            _contacts.Add(contact_);
            return Task.CompletedTask;
        }

        public Task UpdateContactAsync(Contact contact_)
        {
            Contact existingContact = _contacts.FirstOrDefault(c => c.Id == contact_.Id) ?? throw new KeyNotFoundException($"Contact with Id {contact_.Id} not found.");
            
            // Update logic here
            existingContact.FirstName = contact_.FirstName;
            existingContact.LastName = contact_.LastName;
            existingContact.Email = contact_.Email;
            existingContact.Phone = contact_.Phone;
            existingContact.ImageUrl = contact_.ImageUrl;

            return Task.CompletedTask;
        }

        public Task DeleteContactAsync(int id_)
        {
            Contact? contact = _contacts.FirstOrDefault(c => c.Id == id_) ?? throw new KeyNotFoundException($"Contact with Id {id_} not found.");

            _contacts.Remove(contact);
            return Task.CompletedTask;
        }
    }

}
