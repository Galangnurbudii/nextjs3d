import { ReactNode } from "react";

const SummaryLayout = ({ children }: { children: ReactNode }) => {
  <div className="h-screen w-screen flex">
    <div className="w-2/3">{children}</div>
    <div className="w-1/3">b</div>
  </div>;
};

export default SummaryLayout;
