import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

interface Props {
  title : string;
  body : string;
  variant : string;
  show: boolean;
}

function MessageSummary(props : Props) {

  const [show, setShow] = useState(false);

  if (show) {
    return (
      <Alert variant={props.variant} onClose={() => setShow(false)} dismissible className="mt-3">
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>
         {props.body}
        </p>
      </Alert>
    );
  }
}

export default MessageSummary;