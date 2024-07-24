import React, { ReactNode } from "react";

const GuideMeLayout = ({ children }: { children: ReactNode }) => {
  return <div className="p-5 flex flex-col items-center mt-2">{children}</div>;
};

export default GuideMeLayout;
