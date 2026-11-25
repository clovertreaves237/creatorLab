export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 flex flex-col w-full min-h-0">{children}</div>;
}
