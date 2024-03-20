import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { faCoffee, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
	subsets: ["latin"],
	weight: ["600"]
})

export default async function Home() {
	const user = await prisma.user.findFirst({
		where: {
			email: 'test@test.com'
		}
	})

	return (
		<main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
			<div className="space-y-6 text-center">
				<h1 className={cn(
					"text-6xl font-semibold text-white drop-shadow-md",
					font.className,
				)}>
					<FontAwesomeIcon icon={faLock} /> Auth
				</h1>
				<p className="text-white text-lg">
					A simple authentication service
				</p>
				<div>
					<LoginButton>
						<Button variant={"secondary"} size="lg">
							Sign In
						</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	);
}
