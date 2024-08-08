import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { ReactNode } from "react";

const Dropdown = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Ellipsis className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      {children}
    </DropdownMenu>
  );
};

export default Dropdown;
