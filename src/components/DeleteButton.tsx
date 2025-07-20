import { useDeleteTenantMutation } from "@/services/tenantsApi";
import { Button } from "./ui/button";
import { useDeleteExpenseMutation } from "@/services/expensesApi";
import { useDeletePropertyMutation } from "@/services/propertiesApi";
import { useConfirm } from "@/lib/utils";

interface DeleteButtonProps<T> {
  data: T;
  type: string;
}

const DeleteButton = <T extends { _id: string }>({
  data,
  type,
}: DeleteButtonProps<T>) => {
  const id = data._id;

  const [deleteTenant, { isLoading }] = useDeleteTenantMutation();
  const [deleteExpense, { isLoading: expenseIsLoading }] =
    useDeleteExpenseMutation();
  const [deleteProperty, { isLoading: propertyIsLoading }] =
    useDeletePropertyMutation();

  const confirm = useConfirm();

  const handleDelete = async () => {
    const ok = await confirm({
      title: `Delete ${type}`,
      description: `This ${type} will be deleted parmanently`,
    });

    if (ok) {
      try {
        switch (type) {
          case "expense":
            await deleteExpense({ id });
            break;

          case "property":
            await deleteProperty({ id });
            break;

          case "tenant":
            await deleteTenant({ id });
            break;

          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Button
      onClick={handleDelete}
      disabled={isLoading || expenseIsLoading || propertyIsLoading}
      className="text-red-400 cursor-pointer hover:text-red-600"
      variant="ghost"
    >
      {isLoading ? "deleting..." : "delete"}
    </Button>
  );
};

export default DeleteButton;
