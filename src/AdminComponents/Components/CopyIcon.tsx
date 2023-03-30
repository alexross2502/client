import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useClipboard } from "use-clipboard-copy";

const CopyIcon = (props) => {
  const clipboard = useClipboard();
  const [copy, setCopy] = useState(false);

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
