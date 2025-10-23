export async function getReserves() {
  const res = await fetch("/api/reservas", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erro ao buscar reservas");
  return res.json();
}


export async function updateStatus(ids: string[], novoStatus: string) {
  // Garantir URL correta e evitar caracteres inesperados
  const url = "/api/reservas";
  const payload = JSON.stringify({ ids, novoStatus });
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: payload,
    credentials: "include",
  });
  if (!res.ok) throw new Error("Erro ao atualizar status da reserva");
  return res.json();
}