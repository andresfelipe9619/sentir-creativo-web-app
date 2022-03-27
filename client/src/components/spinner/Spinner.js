import { SwapSpinner } from "react-spinners-kit";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/styles";

const Spinner = ({ mt = "20vh", size = 80 } = {}) => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      mt={mt}
      justifyContent="center"
    >
      <SwapSpinner loading size={size} color={theme.palette.primary.main} />
    </Box>
  );
};
export default Spinner;
