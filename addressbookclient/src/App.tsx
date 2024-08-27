import { Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import AllContacts from "./components/AllContacts";
import AddContact from "./components/AddContact";
import UpdateContact from "./components/UpateContact";
import MessageHandler from "./components/shared/MessageHandler";

export default function App() {
	return (
		<>
			<Layout>
				<MessageHandler />
				<Routes>
					<Route path="/" element={<AllContacts></AllContacts>} />
				</Routes>
				<Routes>
					<Route path="/add-contact" element={<AddContact></AddContact>} />
				</Routes>
				<Routes>
					<Route
						path="/update-contact/:id"
						element={<UpdateContact></UpdateContact>}
					/>
				</Routes>
			</Layout>
		</>
	);
}
