export const tagsQueries = {
  all: () => ["tags"] as const,
  lists: () => [...tagsQueries.all(), "list"] as const,
};
