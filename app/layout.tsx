import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core"
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "New App",
	description: "New App Boilerplate",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth()
  return (
		<SessionProvider session={session}>
			<html lang="en">
				<body className={inter.className}>{children}</body>
			</html>
		</SessionProvider>
	);
}
