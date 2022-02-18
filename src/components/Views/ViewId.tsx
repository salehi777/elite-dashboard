import { Tooltip } from "@chakra-ui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

interface ViewIdProps {
  _id: string;
}

export default function ViewId({ _id }: ViewIdProps) {
  return (
    <Tooltip label={_id}>
      <span>
        <CopyToClipboard
          text={_id}
          onCopy={() => toast.info("Copied to clipboard", { autoClose: 2000 })}
        >
          <span className="cursor-pointer">#{_id?.substring?.(0, 4)}...</span>
        </CopyToClipboard>
      </span>
    </Tooltip>
  );
}
