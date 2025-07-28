import type { RootState } from "@/app/store";
import { useGetMeQuery } from "@/services/userApi";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Image } from "@imagekit/react";

const Profile = () => {
  const user = useSelector((state: RootState) => state?.user.user);

  const me = user?.user._id;
  const { data, isLoading } = useGetMeQuery(me ?? "");

  // console.log(data);
  return (
    <div className=" page-section rounded-xl">
      <div className="bg-primary w-full rounded-t-xl h-32"></div>
      <div className="bg-light-300 rounded-b-xl">
        {isLoading ? (
          <Loading title="" />
        ) : (
          data?.map((i: User) => (
            <div key={i._id} className="">
              <div className="relative px-5 flex justify-center">
                <Image
                  src={i.avatarUrl}
                  alt="user"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="rounded-full border-light-300  border-4 absolute -top-20 lg:left-1/4 sm:left-auto left-1/2 transform sm:translate-x-0 -translate-x-1/2 "
                />
              </div>
              <div className="mt-32 flex sm:flex-row flex-col justify-center items-center sm:items-start text-center sm:text-left w-full p-10">
                <div className="flex flex-col w-full sm:w-1/2">
                  <div className="text-3xl font-bold text-primary ">
                    {i.name}
                  </div>
                  <div className="text-xl text-slate-500">{i.email}</div>
                  <div className="text-slate-300 text-sm font-bold  ">
                    Director
                  </div>
                  <p className="">+254-720-965-996</p>
                </div>
                <div className="flex flex-col w-full sm:w-1/2">
                  <div className=" font-bold text-primary mt-10 cursor-pointer sm:mt-2 ">
                    Change Password
                  </div>
                  <div className="text-xl text-slate-500"></div>
                  <div className="text-slate-300 text-sm font-bold  ">
                    <h5>About</h5>
                    <p className="text-xs text-gray-600 font-normal mt-2">
                      I’m a cybersecurity engineer and full-stack developer,
                      serving as Director at Emirl Builders. I lead development
                      teams to build secure, high-performance web systems.
                      Merging my expertise in cloud security, application
                      architecture, and agile management, I deliver resilient,
                      user‑centric solutions that drive innovation across
                      industries.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
