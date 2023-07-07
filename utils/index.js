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

export const getPagination = ({ page, per_page }) => {
  const limit = per_page;
  const from = (page ? page * limit : 0) - per_page;
  const to = page ? from + per_page - 1 : per_page - 1;
  return { from, to };
};
