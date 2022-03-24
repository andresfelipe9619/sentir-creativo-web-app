import { SwapSpinner } from "react-spinners-kit";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/styles";

const Spinner = () => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      mt="20vh"
      justifyContent="center"
    >
      <SwapSpinner loading size={80} color={theme.palette.primary.main} />
    </Box>
  );
};
export default Spinner;
