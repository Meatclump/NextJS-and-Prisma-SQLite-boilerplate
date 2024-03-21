import { UserInfo } from "@/components/user-info"
import { currentUser } from "@/lib/auth"
import { faLaptop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ServerPage = async () => {
	const user = await currentUser()

	return (
		<UserInfo
			label={`${<FontAwesomeIcon icon={faLaptop} />} Server Component`}
			user={user}
		/>
	)
}

export default ServerPage