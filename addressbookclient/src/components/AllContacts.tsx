import axios from "axios";
import { useEffect, useState } from "react";
import { Contact as ContactType } from "../types";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "./shared/DeleteConfirmation";
import { useMessage } from "../context/MessageContext";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";

function AllContacts() {
	const [contacts, setContacts] = useState<ContactType[]>([]);
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [contactToDelete, setContactToDelete] = useState(0);

	const { setMessage } = useMessage();

	useEffect(() => {
		axios.get("https://localhost:7228/api/contacts").then((response) => {
			setContacts(() => {
				return response.data;
			});
		});
	}, []);

	function showConfirmModaHanlder(id: number) {
		setShowModal(true);
		setContactToDelete(id);
	}

	function closeConfirmModaHanlder() {
		setShowModal(false);
		setContactToDelete(0);
	}

	function deleteConfirmHanlder() {
		axios.delete(`https://localhost:7228/api/contacts/${contactToDelete}`)
			.then((response) => {
				console.log(response);
				setContacts((existingData) => {
					return existingData.filter((_) => _.id !== contactToDelete);
				});
				setShowModal(false);
				setContactToDelete(0);
				setMessage("Contact successfully deleted!");
			})
			.catch((error) => {
				console.log("update error");
				setMessage(
					`Error encountered while deleting the contact. Error: ${error}`,
					"danger"
				);
			});
	}

	return (
		<>
			<DeleteConfirmation
				showModal={showModal}
				title="Delete Confirmation"
				body="Are you sure you want to delete this contact?"
				closeButtonText="Cancel"
				saveButtonText="Confirm"
				onClose={closeConfirmModaHanlder}
				onConfirm={deleteConfirmHanlder}
			></DeleteConfirmation>

			{/* <Row className="mt-3">
				<Col>
					<Button variant="primary" type="button" onClick={navigateToAddContact}>
						<FiUserPlus /> Add A New Contact
					</Button>
				</Col>
			</Row> */}

			<Row xs={1} md={4} className="g-4 mt-2">
				{contacts.length > 0 ? (
					contacts.map((contact) => (
						<Col key={contact.id}>
							<Card className="h-100 w-100">
								<Card.Img variant="top" src={contact.imageUrl} />
								<Card.Body>
									<Card.Title className="mb-3">
										{contact.firstName + " " + contact.lastName}
									</Card.Title>
									<Card.Text>
										<b>Email:</b> {contact.email}
									</Card.Text>
									<Card.Text>
										<b>Phone:</b> {contact.phone}
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<Button
										size="sm"
										style={{ marginRight: "5px" }}
										variant="primary"
										type="button"
										onClick={() => {
											navigate(`/update-contact/${contact.id}`);
										}}
									>
										<BsPencilFill />
									</Button>
									<Button
										size="sm"
										className="ml-2"
										variant="danger"
										type="button"
										onClick={() => {
											showConfirmModaHanlder(contact.id);
										}}
									>
										<BsFillTrash3Fill />
									</Button>
								</Card.Footer>
							</Card>
						</Col>
					))
				) : (
					<p>No contacts available.</p>
				)}
			</Row>
		</>
	);
}

export default AllContacts;
