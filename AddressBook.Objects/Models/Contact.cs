using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBook.Objects.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        [MaxLength(50, ErrorMessage = "First Name can't exceed 50 characters")]
        public required string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required")]
        [MaxLength(50, ErrorMessage = "Last Name can't exceed 50 characters")]
        public required string LastName { get; set; }

        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string? Email { get; set; }

        [Phone(ErrorMessage = "Invalid Phone Number")]
        public string? Phone { get; set; }

        public string? ImageUrl { get; set; }
    }
}
