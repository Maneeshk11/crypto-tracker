import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { AppSidebar } from "@/components/Sidebar";
import { Toaster } from "@workspace/ui/components/sonner";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AppSidebar />
          <div className="p-4 w-full">{children}</div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
