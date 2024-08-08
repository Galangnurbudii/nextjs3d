import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { KeyRound, Trash2, UserX } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUser,
  getCurrentUser,
  setAsAdmin,
  setAsUser,
} from "@/actions/admin/userAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/authActions";

const UserDropdownContent = ({
  email,
  role,
}: {
  email: string;
  role: string;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const currentUser = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => await getCurrentUser(),
  });

  const { mutateAsync: logoutMutation } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
  });

  const setAsAdminMutation = useMutation({
    mutationFn: setAsAdmin,
    onSuccess: (data) => {
      if (!data.error) {
        toast.success("User's role has changed to Admin");
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      } else {
        toast.error(data.error);
      }
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async (data) => {
      if (!data.error) {
        toast.success(`User has been deleted`);
        queryClient.invalidateQueries({ queryKey: ["users"] });

        if (currentUser.data?.email === email) {
          await logoutMutation();
        }
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

  return (
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
          <div
            className="gap-2 flex items-center"
            onClick={async () => {
              await deleteUserMutation.mutateAsync({ email });
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete user
          </div>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

export default UserDropdownContent;
