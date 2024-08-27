import { Alert } from "react-bootstrap";
import { useMessage } from "../../context/MessageContext";
import { useEffect, useState } from "react";

function MessageHandler() {
	const { message, variant } = useMessage();
	const [show, setShow] = useState(true);

	useEffect(() => {
		if (message) {
			setShow(true);
			const timer = setTimeout(() => setShow(false), 3000); // Hide after 3 seconds

			return () => clearTimeout(timer);
		}
	}, [message]);

	if (!show || !message) return null;

	return (
		<>
			<Alert
				variant={variant}
				onClose={() => setShow(false)}
				dismissible
				className="mt-3 mb-3"
			>
				{/* <Alert.Heading>Success</Alert.Heading> */}
				{message}
			</Alert>
		</>
	);
}

export default MessageHandler;
