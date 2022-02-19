type GenderStatusProps = {
  gender: string;
};

interface IConfigItem {
  title: string;
  color: string;
  bgColor: string;
}

const config: {
  [status: string]: IConfigItem;
} = {
  male: {
    title: "Male",
    color: "#5B93FF",
    bgColor: "#5B93FF1A",
  },
  female: {
    title: "Female",
    color: "#FF8F6B",
    bgColor: "#FF8F6B1A",
  },
};

export default function GenderStatus({ gender }: GenderStatusProps) {
  return (
    <div
      className="w-full h-[45px] flex items-center justify-center"
      style={{
        borderRadius: 22,
        color: config[gender]?.color,
        background: config[gender]?.bgColor,
      }}
    >
      {config[gender]?.title}
    </div>
  );
}
