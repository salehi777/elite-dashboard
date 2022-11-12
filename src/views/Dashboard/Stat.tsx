import { tailwindTheme } from "utils/theme";

type StatProps = {
  count: number;
  title: string;
  color: string;
  icon: JSX.Element;
};

export default function Stat({ count, title, color, icon }: StatProps) {
  return (
    <div className="bg-white p-6 rounded-xl flex gap-4">
      <div
        className="rounded-full bg-red-200 w-[60px] h-[60px] flex justify-center items-center"
        style={{ background: `${tailwindTheme?.colors?.[color]?.[500]}33` }}
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-extrabold">{count}+</div>
        <div className="text-sm font-normal">{title}</div>
      </div>
    </div>
  );
}
