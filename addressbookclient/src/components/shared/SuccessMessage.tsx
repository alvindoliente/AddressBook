import { Alert, Container } from 'react-bootstrap';
import { useSuccessMessage } from '../../context/SuccessMessageContext';
import { useEffect, useState } from 'react';

const SuccessMessage = () => {

    const { message, variant, clearMessage } = useSuccessMessage();
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setShow(false);
          clearMessage(); // Clear message after hiding
        }, 3000); // Hide after 3 seconds
    
        return () => clearTimeout(timer); // Cleanup timer on unmount
      }, [clearMessage]);

      if (!show || !message) return null;

    return (
        <>
            <Alert variant={variant} onClose={() => { setShow(false); clearMessage(); }}  dismissible className="mt-3">
                <Alert.Heading>Success</Alert.Heading>
                <p>
                    {message}
                </p>
            </Alert>
        </>

  );
};

export default SuccessMessage;
