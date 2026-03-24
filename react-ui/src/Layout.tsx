import React, { ReactNode } from "react";
import Header from "./components/Header/Header";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-25">{children}</main>
      {/* Padding to prevent content from hiding under the fixed header */}
    </div>
  );
};

export default Layout;
