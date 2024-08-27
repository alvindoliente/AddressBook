using NUnit.Framework;
using AddressBook.API.Controllers;
using AddressBook.Objects.Interfaces;
using AddressBook.Objects.Models;
using AddressBook.Objects.Repositories;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.NUnitTest
{
    [TestFixture]
    public class ContactsControllerTests
    {
        private ContactsController _controller;
        private Mock<IContactRepository> _mockRepository;

        [SetUp]
        public void SetUp()
        {
            _mockRepository = new Mock<IContactRepository>();
            _controller = new ContactsController(_mockRepository.Object);
        }

        [Test]
        public async Task GetAllContacts_ReturnsOkResult_WithListOfContacts()
        {
            // Arrange
            var contacts = new List<Contact>
            {
                new Contact { Id = 1, FirstName = "John", LastName = "Joe", Email = "john@example.com", Phone = "123456789" }
            };
            _mockRepository.Setup(repo => repo.GetAllContactsAsync()).ReturnsAsync(contacts);

            // Act
            var result = await _controller.GetAllContacts();

            // Assert
            var okResult = result as OkObjectResult;
            Assert.IsNotNull(okResult);
            var returnValue = okResult.Value as List<Contact>;
            Assert.AreEqual(1, returnValue.Count);

        }

        [Test]
        public async Task GetContactById_UnknownId_ReturnsNotFoundResult()
        {
            // Arrange
            _mockRepository.Setup(repo => repo.GetContactByIdAsync(1)).ThrowsAsync(new KeyNotFoundException());

            // Act
            var result = await _controller.GetContactById(1);

            // Assert
            Assert.IsInstanceOf<NotFoundObjectResult>(result);
        }

        [Test]
        public async Task AddContact_ValidContact_ReturnsCreatedAtAction()
        {
            // Arrange
            var newContact = new Contact { Id = 1, FirstName = "John", LastName = "Joe", Email = "john@example.com", Phone = "123456789" };
            _mockRepository.Setup(repo => repo.AddContactAsync(newContact)).Returns(Task.CompletedTask);

            // Act
            var result = await _controller.AddContact(newContact);

            // Assert
            var createdResult = result as CreatedAtActionResult;
            Assert.IsNotNull(createdResult);
            Assert.AreEqual("GetContactById", createdResult.ActionName);
        }

        [Test]
        public async Task AddContact_InvalidEmail_ReturnsBadRequest()
        {
            // Arrange
            var newContact = new Contact { Id = 1, FirstName = "John", LastName = "Joe", Email = "invalid-email", Phone = "123456789" };

            // Manually trigger model validation
            ValidateModel(newContact);

            // Act
            var result = _controller.AddContact(newContact).Result;

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.IsTrue(_controller.ModelState.ContainsKey(nameof(newContact.Email)));

        }

        [Test]
        public async Task AddContact_InvalidPhone_ReturnsBadRequest()
        {
            // Arrange
            var newContact = new Contact { Id = 1, FirstName = "John", LastName = "Joe", Email = "john@example.com", Phone = "invalid-phone" };

            // Manually trigger model validation
            ValidateModel(newContact);

            // Act
            var result = await _controller.AddContact(newContact);

            // Assert
            var badRequestResult = result as BadRequestObjectResult;
            Assert.IsNotNull(badRequestResult);
            Assert.IsTrue(badRequestResult.Value.ToString().Contains("Invalid phone number"));
        }

        private void ValidateModel(object model)
        {
            var validationContext = new ValidationContext(model, null, null);
            var validationResults = new List<ValidationResult>();
            Validator.TryValidateObject(model, validationContext, validationResults, true);

            foreach (var validationResult in validationResults)
            {
                _controller.ModelState.AddModelError(validationResult.MemberNames.First(), validationResult.ErrorMessage);
            }
        }
    }
}