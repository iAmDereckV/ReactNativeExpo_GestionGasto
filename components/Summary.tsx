import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTransactions } from "../context/TransactionsContext";

const Summary = () => {
  const {
    ingresosTotales,
    gastosTotales,
    balance,
    getMovimientosHoy,
    getMovimientosMes,
  } = useTransactions();

  const totalHoy = getMovimientosHoy().reduce((acc, m) => acc + m.monto, 0);
  const totalMes = getMovimientosMes().reduce((acc, m) => acc + m.monto, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen</Text>
      <Text>Ingresos: ${ingresosTotales.toFixed(2)}</Text>
      <Text>Gastos: ${gastosTotales.toFixed(2)}</Text>
      <Text style={{ fontWeight: "bold" }}>Balance: ${balance.toFixed(2)}</Text>
      <View style={styles.separador} />
      <Text style={styles.sub}>Reporte Diario: ${totalHoy.toFixed(2)}</Text>
      <Text style={styles.sub}>Reporte Mensual: ${totalMes.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
  },
  sub: {
    marginTop: 6,
  },
  separador: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 8,
  },
});

export default Summary;
