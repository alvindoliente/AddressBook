import axios from "axios";
import { useRef } from 'react';
import { Contact as ContactType } from '../types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useSuccessMessage } from "../context/SuccessMessageContext";
import { ThemeProvider } from "react-bootstrap";

function AddContact() {
    
    const firstName = useRef<HTMLInputElement>(null);
    const lastName = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const imageUrl = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();
    const { setMessage } = useSuccessMessage();

    function addContactHandler() {

        try
        {
            var payload = {        
                firstName: firstName.current?.value,
                lastName: lastName.current?.value,
                email: email.current?.value,
                phone: phone.current?.value,
                imageUrl: imageUrl.current?.value
            }

            axios.post("https://localhost:7228/api/contacts", payload)
            .then((response) => {
                    console.log(response);
                    navigate("/");
                    setMessage("Contact successfully saved!", "success");
            });
        }
        catch (error) {
            console.error('Error saving contact:', error);
            setMessage(`Error encountered while saving new contact. Error: ${error}`, "danger");
        }
    }

    return (
        <>
        <legend>Add A New Contact</legend>
         <Form>

            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" ref={firstName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" ref={lastName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" ref={email} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="phone" placeholder="Enter phone number" ref={phone} />
                <Form.Text className="text-muted">
                    We'll never share your phone numbert with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImageUrl">
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text" placeholder="Image" ref={imageUrl} />
            </Form.Group>

            <Button variant="primary" type="button" onClick={addContactHandler}>
                Submit
            </Button>
        </Form>
        </>
    );
  }
  
  export default AddContact;