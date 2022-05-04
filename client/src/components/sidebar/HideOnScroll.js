import Slide from "@material-ui/core/Slide";
import { useScrollTrigger } from "@material-ui/core";

export default function HideOnScroll(props) {
  const { children, window, threshold = 100 } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    threshold,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
