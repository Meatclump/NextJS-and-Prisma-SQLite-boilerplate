import { prisma } from "@/lib/prisma";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Home() {
	const user = await prisma.user.findFirst({
		where: {
			email: 'test@test.com'
		}
	})

	return (
		<main>
			Hello, {user?.email} <FontAwesomeIcon icon={faCoffee} />
		</main>
	);
}
