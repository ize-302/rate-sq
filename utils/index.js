/* istanbul ignore file */
export const paginator = ({ count, page, per_page, from, to }) => {
  let total_pages = Math.ceil(count / per_page);
  return {
    page: page,
    per_page: per_page,
    prev_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: count.length,
    total_pages: total_pages,
    count,
    from, to
  };
}
