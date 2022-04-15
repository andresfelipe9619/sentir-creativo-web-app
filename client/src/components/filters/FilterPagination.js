import Pagination from "@material-ui/lab/Pagination";
import { memo } from "react";
import useStyles from "./styles";

function FilterPagination({
  loading,
  count,
  page,
  handleChangePage,
  pageSize,
}) {
  const classes = useStyles();

  return (
    <Pagination
      disabled={loading}
      count={Math.ceil(count / pageSize)}
      color="standard"
      page={page}
      classes={{ root: classes.paginationRoot, ul: classes.paginationUL }}
      onChange={handleChangePage}
      variant="outlined"
      shape="rounded"
    />
  );
}

export default memo(FilterPagination);
