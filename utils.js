module.exports.api_version = '/v1'

module.exports.paginator = (items, page, per_page) => {
  var page = page || 1,
    per_page = per_page || 10,
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
    data: paginatedItems
  };
}