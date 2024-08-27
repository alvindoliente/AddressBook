import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


interface Props {
  children: React.ReactNode
}

function Layout(props : Props) {
    
    return (
        <>
          <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Address Book</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
          </Navbar>
          <Container>
            {props.children}
          </Container>
      </>
    );
  }
  
  export default Layout;