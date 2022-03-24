import { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";

export default function CopyClipboard({
  title = "¡Copiado!",
  tooltipProps,
  children,
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const onCopy = (content) => {
    window.navigator.clipboard.writeText(content);
    setShowTooltip(true);
  };

  const handleOnTooltipClose = () => {
    setShowTooltip(false);
  };

  return (
    <Tooltip
      open={showTooltip}
      title={title}
      leaveDelay={1500}
      onClose={handleOnTooltipClose}
      {...tooltipProps}
    >
      {children({ copy: onCopy })}
    </Tooltip>
  );
}
