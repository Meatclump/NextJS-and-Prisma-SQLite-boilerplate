"use client"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
 } from "@/components/ui/dropdown-menu"
import {
	Avatar,
	AvatarImage,
	AvatarFallback
} from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/use-current-user"
import { LogoutButton } from "@/components/auth/logout-button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

export const UserButton = () => {
	const user = useCurrentUser()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={user?.image || ""} />
					<AvatarFallback className="bg-sky-500">
						<FaUser className="text-white" />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40 items-end">
				<LogoutButton>
					<FontAwesomeIcon icon={faArrowRightFromBracket} className="h-4 w-4 mr-2" /> Logout
				</LogoutButton>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}