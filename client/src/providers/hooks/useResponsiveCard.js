import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function useResponsiveCard() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isMedium = useMediaQuery(theme.breakpoints.down("md"));
  const length = isSmall ? 1 : isMedium ? 2 : 3;

  return length;
}
