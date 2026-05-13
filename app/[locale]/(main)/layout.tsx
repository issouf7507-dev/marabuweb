"use client";
import Footer from "../../components/footer";
import Header from "../../components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col w-full h-full overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
