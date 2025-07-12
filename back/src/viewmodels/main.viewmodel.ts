export function mainToViewModel(item: any) {
  return {
    id: item.id,
    name: item.title,
    summary: item.description,
  };
}
