/* istanbul ignore file */
export const paginator = (items, page = 1, per_page = 10) => {
  var page = page,
    per_page = per_page,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
  return {
    page: Number(page),
    per_page: Number(per_page),
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? Number(page) + 1 : null,
    total: items.length,
    total_pages: total_pages,
    items: paginatedItems
  };
}
