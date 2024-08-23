using NUnit.Framework;
using AddressBook.API.Controllers;
using AddressBook.Objects.Interfaces;
using AddressBook.Objects.Models;
using AddressBook.Objects.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AddressBook.NUnitTest
{
    [TestFixture]
    public class ContactsControllerTests
    {
        private ContactsController _controller;
        private IContactRepository _repository;

        [SetUp]
        public void SetUp()
        {
            _repository = new InMemoryContactRepository();
            _controller = new ContactsController(_repository);
        }

        [Test]
        public void GetById_NonExistentId_ThrowsKeyNotFoundException()
        {
            // Arrange
            int nonExistentId = 999;

            // Act & Assert
            var exception = Assert.Throws<KeyNotFoundException>(() => _repository.GetById(nonExistentId));
            Assert.AreEqual($"Contact with ID {nonExistentId} not found.", exception.Message);
        }

        [Test]
        public void Update_MismatchedIds_ReturnsBadRequest()
        {
            // Arrange
            Contact contact = new() { Id = 1, FirstName = "John", LastName = "Doe" };

            // Act
            IActionResult result = _controller.Update(2, contact);

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result);
            var badRequestResult = (BadRequestObjectResult)result;
            object errorResponse = badRequestResult.Value;

            // Using reflection to get the error property
            var errorProperty = errorResponse.GetType().GetProperty("error");
            string errorMessage = errorProperty.GetValue(errorResponse) as string;

            Assert.AreEqual("ID in URL does not match ID in request body.", errorMessage);

        }

        [Test]
        public void Add_NullContact_ThrowsArgumentNullException()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => _repository.Add(null));
        }

        [Test]
        public void Delete_NonExistentId_ThrowsKeyNotFoundException()
        {
            // Arrange
            int nonExistentId = 999;

            // Act & Assert
            var exception = Assert.Throws<KeyNotFoundException>(() => _repository.Delete(nonExistentId));
            Assert.AreEqual($"Contact with ID {nonExistentId} not found.", exception.Message);
        }
    }
}