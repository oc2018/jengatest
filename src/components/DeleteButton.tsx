import { useDeleteTenantMutation } from "@/services/tenantsApi";
import { Button } from "./ui/button";

const DeleteButton = ({ data }: { data: Tenant | Property }) => {
  const [deleteTenant, { isLoading }] = useDeleteTenantMutation();
  return (
    <Button
      onClick={() => deleteTenant(data._id)}
      disabled={isLoading}
      className="text-red-400 cursor-pointer hover:text-red-600"
      variant="ghost"
    >
      {isLoading ? "deleting" : "delete"}
    </Button>
  );
};

export default DeleteButton;
