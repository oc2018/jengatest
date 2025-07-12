/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUpdateTenantMutation } from "@/services/tenantsApi";
import { cleanData } from "@/lib/utils";
import { useUpdatePropertiesMutation } from "@/services/propertiesApi";

const DetailsModal = ({
  data,
  setOpen,
}: {
  data: Record<string, any>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [formData, setformData] = useState<Partial<Tenant | Property>>(() =>
    cleanData(data)
  );

  const [updateProperties] = useUpdatePropertiesMutation();
  const [updateTenant] = useUpdateTenantMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = (data as any)._id;

    if ("name" in data) {
      await updateTenant({ id, tenantData: formData as Tenant }).unwrap();
    } else {
      await updateProperties({ id, propertyData: formData as Property });
    }

    setOpen(false);
  };

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex items-center gap-2">
          <label className="w-1/4">{key.replace(/([A-Z])/g, "$1")}:</label>
          <Input
            type={typeof value === "number" ? "number" : "text"}
            value={(value ?? "").toString()}
            className="input"
            onChange={(e) =>
              setformData((prev) => ({
                ...prev,
                [key]:
                  typeof value === "number" ? +e.target.value : e.target.value,
              }))
            }
          />
        </div>
      ))}
      <Button
        type="submit"
        className="text-white font-bold mt-3 cursor.pointer w-full"
      >
        Update
      </Button>
    </form>
    // <form className="flex flex-col w-full p-3 gap-4" onSubmit={handleSubmit}>
    //   <div className="flex max-md:flex-row">
    //     <p className="w-1/4">Name:</p>
    //     <Input
    //       type="text"
    //       className="border border-light-100 bg-dark-300 text-light-400"
    //       value={tenantData.name}
    //       onChange={(e) =>
    //         setTenantData({ ...tenantData, name: e.target.value })
    //       }
    //     />
    //   </div>
    //   <div className="flex max-md:flex-row">
    //     <p className="w-1/4">Email:</p>
    //     <Input
    //       type="email"
    //       className="border border-light-100 bg-dark-300 text-light-400"
    //       value={tenantData.email}
    //       onChange={(e) =>
    //         setTenantData({ ...tenantData, email: e.target.value })
    //       }
    //     />
    //   </div>
    //   <div className="flex max-md:flex-row">
    //     <p className="w-1/4">Phone number:</p>
    //     <Input
    //       type="phone"
    //       className="border border-light-100 bg-dark-300 text-light-400"
    //       value={tenantData.phoneNumber}
    //       onChange={(e) =>
    //         setTenantData({ ...tenantData, phoneNumber: e.target.value })
    //       }
    //     />
    //   </div>
    //   <Button className="text-white font-bold mt-3 cursor-pointer w-full">
    //     Edit
    //   </Button>
    // </form>
  );
};

export default DetailsModal;
