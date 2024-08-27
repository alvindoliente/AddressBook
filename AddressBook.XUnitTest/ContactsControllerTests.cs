using AddressBook.API.Controllers;
using AddressBook.Objects.Interfaces;
using AddressBook.Objects.Models;
using AddressBook.Objects.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AddressBook.XUnitTest
{
    public class ContactsControllerTests
    {
        private readonly ContactsController _controller;
        private readonly IContactRepository _repository;

        public ContactsControllerTests()
        {
            _repository = new InMemoryContactRepository();
            _controller = new ContactsController(_repository);
        }

        [Fact]
        public void GetById_NonExistentId_ReturnsNotFound()
        {
            // Arrange
            int nonExistentId = 999;

            // Act & Assert
            var exception = Assert.Throws<KeyNotFoundException>(() => _repository.GetContactByIdAsync(nonExistentId));
            Assert.Equal($"Contact with ID {nonExistentId} not found.", exception.Message);
        }

        [Fact]
        public void Update_MismatchedIds_ReturnsBadRequest()
        {
            // Arrange
            Contact contact = new() { Id = 1, FirstName = "John", LastName = "Doe" };

            // Act
            IActionResult result = _controller.Update(2, contact);

            // Assert
            BadRequestObjectResult badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            object? errorResponse = badRequestResult.Value;

            // Using reflection to get the error property
            System.Reflection.PropertyInfo? errorProperty = errorResponse.GetType().GetProperty("error");
            string errorMessage = errorProperty.GetValue(errorResponse) as string;

            Assert.Equal("ID in URL does not match ID in request body.", errorMessage);
        }

        [Fact]
        public void Add_NullContact_ThrowsArgumentNullException()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => _repository.AddContactAsync(null));
        }

        [Fact]
        public void Delete_NonExistentId_ThrowsKeyNotFoundException()
        {
            // Arrange
            int nonExistentId = 999;

            // Act & Assert
            var exception = Assert.Throws<KeyNotFoundException>(() => _repository.DeleteContactAsync(nonExistentId));
            Assert.Equal($"Contact with ID {nonExistentId} not found.", exception.Message);
        }
    }
}