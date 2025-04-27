'use client'

import { Provider } from "react-redux";
import "./globals.css";
import { store } from "@/store/store/store";
import { AuthProvider } from "@/providers/AuthProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Provider>
        
      </body>
    </html>
  );
}
