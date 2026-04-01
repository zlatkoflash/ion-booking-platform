import { InactivityHandler } from "./InactivityHandler";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <InactivityHandler />
    </>
  )
}