import React from "react";
import { Platform, View, Button, Alert } from "react-native";
import { useTransactions } from "../context/TransactionsContext";
import * as FileSystem from "expo-file-system";

export const convertToCSV = (data: any[]) => {
  if (!data || data.length === 0) return "";

  const headers = ["id", "tipo", "descripcion", "monto", "fecha"];
  const csvRows = [
    headers.join(","),
    ...data.map(row => headers.map(field => JSON.stringify(row[field] ?? "")).join(",")),
  ];

  return csvRows.join("\n");
};

const DownloadButton = () => {
  const { movimientos } = useTransactions();

  const handleDownload = async () => {
    const csv = convertToCSV(movimientos);

    if (Platform.OS === "web") {
      // Descarga en navegador (web)
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "movimientos.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Descarga en dispositivos móviles
      const fileUri = FileSystem.documentDirectory + "movimientos.csv";
      try {
        await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
        Alert.alert("Archivo guardado", `Se guardó en:\n${fileUri}`);
      } catch (error) {
        Alert.alert("Error", "No se pudo guardar el archivo");
      }
    }
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Button title="Descargar Registros (CSV)" onPress={handleDownload} />
    </View>
  );
};

export default DownloadButton;
