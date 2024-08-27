import { FallbackProps } from 'react-error-boundary';
import { Alert, Button, Container } from 'react-bootstrap';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {

  return (

    <>
        <Container>
            <Alert variant="danger" className="mt-4">
            <Alert.Heading>Something went wrong:</Alert.Heading>
            <p>
                {error.message}
            </p>
            <Button variant="primary" onClick={resetErrorBoundary}>
                Try again
            </Button>
            </Alert>
        </Container>
    </>
    
  );

}

export default ErrorFallback;