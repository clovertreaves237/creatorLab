export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12 bg-paper relative overflow-hidden">
      {/* Subtle radial Cyber Cyan background glow from PDF page 1 */}

      {/* Auth Card Container */}
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}
