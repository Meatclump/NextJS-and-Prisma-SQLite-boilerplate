"use client"

import { logout } from "@/actions/logout"

interface LogoutButtonProps {
	children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
	function onClick() {
		console.log("logging out?")
		logout()
	}

	return (
		<span
			className="cursor-pointer w-full flex items-center py-0 px-3"
			onClick={() => {onClick()}}
		>
			{children}
		</span>
	)
}