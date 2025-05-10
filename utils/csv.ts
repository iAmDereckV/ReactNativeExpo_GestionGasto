export const convertToCSV = (data: any[]) => {
  if (!data || data.length === 0) return "";

  const headers = ["id", "tipo", "descripcion", "monto", "fecha"];
  const csvRows = [
    headers.join(","), // Encabezado
    ...data.map(row =>
      headers.map(field => JSON.stringify(row[field] ?? "")).join(",")
    ),
  ];

  return csvRows.join("\n");
};
