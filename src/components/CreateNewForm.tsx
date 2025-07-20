/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, type Dispatch, type SetStateAction } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  useCreatePropertyMutation,
  useGetPropertiesQuery,
  useUpdatePropertiesMutation,
} from "@/services/propertiesApi";
import Loading from "@/pages/Loading";
import { useCreateTenantMutation } from "@/services/tenantsApi";
import { useCreateExpenseMutation } from "@/services/expensesApi";

const CreateNewForm = ({
  formInitialState,
  setOpen,
}: {
  formInitialState: Record<string, any>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { properties = [], isLoading } = useGetPropertiesQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      properties: data?.filter((p: Property) => p.status !== "Occupied") ?? [],
      ...rest
    }),
  });
  const [formData, setFormData] = useState(formInitialState);
  const [createTenant] = useCreateTenantMutation();
  const [createProperty] = useCreatePropertyMutation();
  const [createExpense] = useCreateExpenseMutation();
  const [updateProperty] = useUpdatePropertiesMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ("address" in formData) {
      await createProperty({ propertyData: formData as Property });
    } else if ("description" in formData) {
      await createExpense({ expenseData: formData as Expense });
    } else {
      const id = formData.property;
      await updateProperty({ id, propertyData: { status: "Occupied" } });
      await createTenant({ tenantData: formData as Tenant });
    }
    setOpen(false);
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      {Object.entries(formData).map(([key]) => (
        <div key={key} className="flex items-center gap-2">
          <label className="w-1/4">
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
            :
          </label>
          {key === "property" ? (
            <Select
              onValueChange={(val) => setFormData({ ...formData, [key]: val })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Property" />
              </SelectTrigger>
              <SelectContent className="text-white">
                {isLoading ? (
                  <Loading title="" />
                ) : (
                  properties.map((property: Property, key: number) => (
                    <SelectItem
                      key={key}
                      className="cursor-pointer focus:bg-primary/20"
                      value={property._id}
                    >
                      {property.address}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          ) : (
            <Input
              type={key === "rent" || key === "deposit" ? "number" : "text"}
              className="input"
              value={formData[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
            />
          )}
        </div>
      ))}
      <Button type="submit" className="text-white mt-5 w-full cursor-pointer">
        Save
      </Button>
    </form>
  );
};

export default CreateNewForm;
