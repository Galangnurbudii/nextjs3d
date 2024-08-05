import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, KeyRound, Trash2, UserX } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAsAdmin, setAsUser } from "@/actions/admin/userAction";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UserDropdown = ({ email, role }: { email: string; role: string }) => {
  const queryClient = useQueryClient();

  const setAsAdminMutation = useMutation({
    mutationFn: setAsAdmin,
    onSuccess: (data) => {
      if (!data.error) {
        toast.success("User's role has changed to Admin");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(data.error);
      }
    },
  });

  const setAsUserMutation = useMutation({
    mutationFn: setAsUser,
    onSuccess: (data) => {
      if (!data.error) {
        toast.success("User's role has changed to User");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      } else {
        toast.error(data.error);
      }
    },
  });

  const handleSetAdmin = async (email: string) => {
    try {
      await setAsAdminMutation.mutateAsync({ email });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSetUser = async (email: string) => {
    try {
      await setAsUserMutation.mutateAsync({ email });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (setAsAdminMutation.isPending || setAsUserMutation.isPending) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <AiOutlineLoading3Quarters className="animate-spin w-4 h-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Ellipsis className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {role === "admin" ? (
              <div
                className="gap-2 flex items-center"
                onClick={() => {
                  handleSetUser(email);
                }}
              >
                <UserX className="h-4 w-4" />
                Remove from admin
              </div>
            ) : (
              <div
                className="gap-2 flex items-center"
                onClick={() => {
                  handleSetAdmin(email);
                }}
              >
                <KeyRound className="h-4 w-4" />
                Make it admin
              </div>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <div className="gap-2 flex items-center">
              <Trash2 className="h-4 w-4" />
              Delete user
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
