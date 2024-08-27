import axios from "axios";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../context/MessageContext";

function AddContact() {
	const firstName = useRef<HTMLInputElement>(null);
	const lastName = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const phone = useRef<HTMLInputElement>(null);
	const imageUrl = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();
	const { setMessage } = useMessage();

	function addContactHandler() {
		if (
			firstName.current?.reportValidity() &&
			lastName.current?.reportValidity() &&
			email.current?.reportValidity() &&
			phone.current?.reportValidity() &&
			imageUrl.current?.reportValidity()
		) {
			var payload = {
				firstName: firstName.current?.value,
				lastName: lastName.current?.value,
				email: email.current?.value,
				phone: phone.current?.value,
				imageUrl: imageUrl.current?.value,
			};

			axios.post("https://localhost:7228/api/contacts", payload)
				.then((response) => {
					console.log(response);
					navigate("/");
					setMessage("Contact successfully saved!");
				})
				.catch((error) => {
					console.log("update error");
					setMessage(
						`Error encountered while adding the contact. Error: ${error}`,
						"danger"
					);
				});
		}
	}

	return (
		<>
			<legend className="mt-3 mb-3">Add A New Contact</legend>
			<Form>
				<Form.Group className="mb-3" controlId="formFirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="First Name"
						ref={firstName}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control
						type="text"
						placeholder="Last Name"
						ref={lastName}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formEmail">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter email"
						ref={email}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formPhone">
					<Form.Label>Phone Number (###-###-####)</Form.Label>
					<Form.Control
						type="tel"
						placeholder="Enter phone number"
						pattern="^\d{3}-\d{3}-\d{4}$"
						title="Please enter a valid phone number"
						ref={phone}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formImageUrl">
					<Form.Label>Image Url</Form.Label>
					<Form.Control type="text" placeholder="Image" ref={imageUrl} required />
				</Form.Group>

				<Button variant="primary" type="button" onClick={addContactHandler}>
					Submit
				</Button>
			</Form>
		</>
	);
}

export default AddContact;
