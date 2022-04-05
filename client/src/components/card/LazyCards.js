import ReactList from "react-list";
import Grid from "@material-ui/core/Grid";
import LazyLoading from "react-list-lazy-load";
import CardSkeleton from "./CardSkeleton";
import useResponsiveCard from "../../providers/hooks/useResponsiveCard";
import { memo, useState } from "react";

const PAGE_SIZE = 10;

const randBetween = (min, max) => Math.floor(min + Math.random() * (max - min));

function LazyCards(props) {
  const { data, itemRenderer } = props;
  const length = useResponsiveCard();
  const [items, setItems] = useState([]);

  // Simulate a network request for `limit` items
  const lazyFetch = (page, cb) => {
    setTimeout(() => cb(), randBetween(250, 1250));
  };

  const handleRequestPage = (page, cb) => {
    // Simulate a network request or other async operation
    lazyFetch(page, () => {
      // Merge the new page into the current `items` collection and rerender
      setItems(data.slice(0, page * PAGE_SIZE));
      // Tell LazyList that the page was loaded
      cb();
    });
  };

  return (
    <LazyLoading
      pageSize={PAGE_SIZE}
      length={data.length}
      items={items}
      onRequestPage={handleRequestPage}
    >
      <ReactList
        itemsRenderer={(items, ref) => (
          <Grid item container md={12} ref={ref}>
            {items}
          </Grid>
        )}
        itemRenderer={(idx, key) =>
          items[idx] ? (
            <Grid key={key} item md={12 / length}>
              {itemRenderer(items[idx])}
            </Grid>
          ) : (
            <Grid key={key + "loading"} item md={12 / length}>
              <CardSkeleton />
            </Grid>
          )
        }
        type="uniform"
        length={data.length}
      />
    </LazyLoading>
  );
}

export default memo(LazyCards);
