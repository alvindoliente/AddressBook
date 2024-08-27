import React, { createContext, ReactNode, useContext, useState } from "react";

interface MessageContextType {
	message: string;
	variant: string;
	setMessage: (message: string, variant?: string) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [message, setMessageState] = useState<string>("");
	const [variant, setVariant] = useState<string>("success"); // Default variant

	const setMessage = (message: string, variant: string = "success") => {
		setMessageState(message);
		setVariant(variant);
	};

	return (
		<MessageContext.Provider value={{ message, variant, setMessage }}>
			{children}
		</MessageContext.Provider>
	);
};

export const useMessage = () => {
	const context = useContext(MessageContext);
	if (!context) {
		throw new Error("useMessage must be used within a MessageProvider");
	}
	return context;
};
