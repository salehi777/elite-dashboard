type InvoiceStatusProps = {
  status: string;
};

interface IConfigItem {
  title: string;
  color: string;
  bgColor: string;
}

const config: {
  [status: string]: IConfigItem;
} = {
  pending: {
    title: "Pending",
    color: "#F29339",
    bgColor: "#F293391A",
  },
  completed: {
    title: "Pending",
    color: "#3A974C",
    bgColor: "#3A974C1A",
  },
  cancel: {
    title: "Pending",
    color: "#D11A2A",
    bgColor: "#D11A2A1A",
  },
};

export default function InvoiceStatus({ status }: InvoiceStatusProps) {
  return (
    <div
      className="w-full h-[45px] flex items-center justify-center"
      style={{
        borderRadius: 22,
        color: config[status]?.color,
        background: config[status]?.bgColor,
      }}
    >
      {config[status]?.title}
    </div>
  );
}
