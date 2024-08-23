using AddressBook.Objects.Interfaces;
using AddressBook.Objects.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {

        private readonly IContactRepository _repository;

        public ContactsController(IContactRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Contact>> GetAll() => Ok(_repository.GetAll());

        [HttpGet("{id}")]
        public ActionResult<Contact> GetById(int id)
        {
            Contact contact = _repository.GetById(id);
            return Ok(contact);
        }

        [HttpPost]
        public ActionResult<Contact> Add(Contact contact)
        {
            _repository.Add(contact);
            return CreatedAtAction(nameof(GetById), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest(new { error = "ID in URL does not match ID in request body." });
            }

            _repository.Update(contact);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repository.Delete(id);
            return NoContent();
        }

    }
}
