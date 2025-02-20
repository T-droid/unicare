export const getPaginationParams = (query: Record<string, any>) => {
  // The Record is more like `dict` in python
  const page = Math.max(1, parseInt(query.page as string, 10) || 1);
  const limit = Math.max(1, parseInt(query.limit as string, 10) || 10);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

export const getPaginationMetadata = (
  total: number,
  page: number,
  limit: number,
) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
