import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { MessageProvider } from "./context/MessageContext.tsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/shared/ErrorFallback.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<MessageProvider>
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => {
					// Reset the state of your application if needed
					window.location.reload();
				}}
			>
				<App />
			</ErrorBoundary>
		</MessageProvider>
	</BrowserRouter>
);
