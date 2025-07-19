const Loading = ({ title }: { title: string }) => {
  return (
    <section className="page-section gap-5">
      <div className="flex flex-row w-full justify-between ">
        <h2 className="text-xl font-semibold text-primary">{title}</h2>
      </div>
      <div className="">Loading...</div>
    </section>
  );
};

export default Loading;
