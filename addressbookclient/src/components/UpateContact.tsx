import axios from "axios";
import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useMessage } from "../context/MessageContext";

function UpdateContact() {
	const firstName = useRef<HTMLInputElement>(null);
	const lastName = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const phone = useRef<HTMLInputElement>(null);
	const imageUrl = useRef<HTMLInputElement>(null);
	const { setMessage } = useMessage();

	const { id } = useParams();

	useEffect(() => {
		axios.get(`https://localhost:7228/api/contacts/${id}`).then((response) => {
			if (firstName.current) {
				firstName.current.value = response.data.firstName;
			}

			if (lastName.current) {
				lastName.current.value = response.data.lastName;
			}

			if (email.current) {
				email.current.value = response.data.email;
			}

			if (phone.current) {
				phone.current.value = response.data.phone;
			}

			if (imageUrl.current) {
				imageUrl.current.value = response.data.imageUrl;
			}
		});
	}, []);

	const navigate = useNavigate();

	function updateContactHandler() {
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
				id: id,
			};

			axios.put(`https://localhost:7228/api/contacts/${id}`, payload)
				.then((response) => {
					console.log(response);
					navigate("/");
					setMessage("Contact successfully updated!", "success");
				})
				.catch((error) => {
					console.log(error);
					setMessage(
						`Error encountered while updating the contact. Error: ${error}`,
						"danger"
					);
				});
		}
	}

	return (
		<>
			<legend className="mt-3 mb-3">Update A Contact</legend>
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

				<Button variant="primary" type="button" onClick={updateContactHandler}>
					Submit
				</Button>
			</Form>
		</>
	);
}

export default UpdateContact;
