export function getIdFromStorage() {
  const id = localStorage.getItem("id");
  return id ? id : null;
}
