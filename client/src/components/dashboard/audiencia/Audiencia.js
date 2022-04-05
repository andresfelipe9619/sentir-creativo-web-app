import React from "react";
import AdminAudienceCard from "../../card/AdminAudienceCard";
import MasterDetail from "../../master-detail/MasterDetail";
import Grid from "@material-ui/core/Grid";
import ReactList from "react-list";
import LazyLoading from "react-list-lazy-load";
import CardSkeleton from "../../card/CardSkeleton";
import useResponsiveCard from "../../../providers/hooks/useResponsiveCard";
import columns from "./columns";

export default function Audiencia() {
  const master = {
    columns,
    title: "Audiencia",
  };
  const detail = {
    columns,
  };

  return (
    <Grid item md={12}>
      <MasterDetail
        toggle
        lazy
        renderMaster={(props) => <LazyCards {...props} />}
        masterProps={master}
        detailProps={detail}
        service="Audiencia"
      />
    </Grid>
  );
}

function LazyCards(props) {
  const { data, loadMore, count } = props;
  console.log("lazy props", props);
  const length = useResponsiveCard();
  // Simulate a network request for `limit` items

  const handleRequestPage = (page, cb) => {
    // Simulate a network request or other async operation
    loadMore && loadMore();
  };

  return (
    <LazyLoading
      pageSize={3}
      length={count}
      items={data}
      onRequestPage={handleRequestPage}
    >
      <ReactList
        itemsRenderer={(items, ref) => (
          <Grid item container md={12} ref={ref}>
            {items}
          </Grid>
        )}
        itemRenderer={(idx, key) =>
          // If `items[index] == null`, the page is still being loaded.
          data[idx] ? (
            <Grid key={idx} item md={12 / length}>
              <AdminAudienceCard audience={data[idx]} />
            </Grid>
          ) : (
            <Grid key={idx + "loading"} item md={12 / length}>
              <CardSkeleton />
            </Grid>
          )
        }
        type="uniform"
        length={count}
      />
    </LazyLoading>
  );
}
