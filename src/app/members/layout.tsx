import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resident Portal - Vulcano Towers Community",
  description: "Access building services, connect with neighbors, and manage your Vulcano Towers residence.",
};

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}