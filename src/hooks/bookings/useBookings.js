import { noop, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "gte" };

  //sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // query
  const {
    isPending,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient
      .query({
        queryKey: ["bookings", filter, sortBy, page + 1],
        queryFn: () =>
          getBookings({
            filter,
            sortBy,
            page: page + 1,
          }),
      })
      .catch(noop);
  }
  // noop - a function that does nothing - if promise fails do nothing

  if (page > 1) {
    queryClient
      .query({
        queryKey: ["bookings", filter, sortBy, page - 1],
        queryFn: () =>
          getBookings({
            filter,
            sortBy,
            page: page - 1,
          }),
      })
      .catch(noop);
  }
  return { isPending, bookings, error, count };
}
