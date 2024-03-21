import { ExtendedUser } from "@/auth"
import { Card, CardHeader } from "./ui/card"


interface UserInfoProps {
	user?: ExtendedUser
	label: string
}

export const UserInfo = ({
	user,
	label
}: UserInfoProps) => {
	return (
		<Card>
			<CardHeader>
				<p className="text-2xl font-semibold text-center">
					{label}
				</p>
			</CardHeader>
		</Card>
	)
}