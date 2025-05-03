import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-amber-100 m-auto min-w-xl max-w-6/12 h-full">
      {children}
    </div>
  );
};
export default Layout;
