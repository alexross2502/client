import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import React = require("react");
import { useClipboard } from "use-clipboard-copy";

const CopyIcon = (props) => {
  const clipboard = useClipboard();
  const [copy, setCopy] = useState<boolean>(false);

  return !copy ? (
    <ContentCopyIcon
      onClick={() => {
        clipboard.copy(props.data);
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1500);
      }}
    ></ContentCopyIcon>
  ) : (
    <DoneIcon />
  );
};

export default CopyIcon;
