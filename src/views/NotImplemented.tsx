import WorkAtHomeImage from "assets/images/work_at_home.png";

export default function NotImplemented() {
  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="mt-6 mb-4 text-2xl font-medium text-center underline text-main-primary">
        This section is under development.
      </h1>

      <img src={WorkAtHomeImage} alt="Not implemented" />
    </div>
  );
}
