import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FiBookOpen, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface Props {
	children: React.ReactNode;
}

function Layout(props: Props) {
	const navigate = useNavigate();

	function navigateToAddContact() {
		navigate("/add-contact");
	}

	return (
		<>
			<Navbar expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href="/">
						<FiBookOpen /> Address Book
					</Navbar.Brand>
					<Navbar.Brand onClick={navigateToAddContact}>
						<Button variant="dark" type="button" size="sm">
							<FiPlus /> New Contact
						</Button>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
				</Container>
			</Navbar>
			<Container>{props.children}</Container>
		</>
	);
}

export default Layout;
