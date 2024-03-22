import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel="Oops! Something went wrong!"
			backButtonHref="/auth/login"
			backButtonLabel="Back to login"
		>
			<div className="w-full items-center flex justify-center">
				<FontAwesomeIcon icon={faExclamationTriangle} className="text-destructive" />
			</div>
		</CardWrapper>
	)
}