export const updateData = (items, updatedItem) => {
  const index = items.findIndex((item) => item.id === updatedItem.id);

  if (index !== -1) {
    items[index] = updatedItem;
  }

  return items;
};
