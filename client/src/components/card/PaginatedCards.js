import React, { useState } from "react";
import useResponsiveCard from "../../providers/hooks/useResponsiveCard";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import { pluralize } from "../../utils";

const PAGE_SIZE = 12;

export default function PaginatedCards(props) {
  const { loading, renderCard, data, showPagination = false } = props;
  const [page, setPage] = useState(1);

  const length = useResponsiveCard();
  const count = data.length;
  const offset = (page - 1) * PAGE_SIZE;
  const limit = page * PAGE_SIZE;
  const items2show = data.slice(offset, limit);

  const handleChangePage = (_, value) => {
    if (value === page) return;
    setPage(value);
  };

  return (
    <Box p={2}>
      {showPagination && (
        <Box
          width="100%"
          my={4}
          display="flex"
          justifyContent="space-between"
          fontWeight={"bold"}
        >
          {loading
            ? `Haciendo magia ...`
            : `${count} ${pluralize("elemento", count)} ${pluralize(
                "encontrado",
                count
              )}: `}

          <Pagination
            disabled={loading}
            count={Math.ceil(count / PAGE_SIZE)}
            color="standard"
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
      <Grid item container md={12} alignItems="center">
        {items2show.map((a) => (
          <Grid item key={a.id} xs={12 / length} md={4} xl={3}>
            {renderCard && renderCard(a)}
          </Grid>
        ))}
      </Grid>
      {showPagination && (
        <Box
          width="100%"
          mb={5}
          mt={2}
          display="flex"
          justifyContent="flex-end"
          fontWeight={"bold"}
        >
          <Pagination
            disabled={loading}
            count={Math.ceil(count / PAGE_SIZE)}
            color="standard"
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
