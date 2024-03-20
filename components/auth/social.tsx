"use client"

import { Button } from "@/components/ui/button"
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Social = () => {
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => {}}
			>
				<FontAwesomeIcon className="h-5 w-5" icon={faGoogle} />
			</Button>
			<Button
				size="lg"
				className="w-full"
				variant="outline"
				onClick={() => {}}
			>
				<FontAwesomeIcon className="h-5 w-5" icon={faGithub} />
			</Button>
		</div>
	)
}