import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTransactions } from "../context/TransactionsContext";

const TransactionList = () => {
  const { movimientos } = useTransactions();

  if (movimientos.length === 0) {
    return <Text style={styles.empty}>No hay movimientos registrados.</Text>;
  }

  return (
    <FlatList
      data={movimientos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          <Text style={item.tipo === "gasto" ? styles.gasto : styles.ingreso}>
            {item.tipo === "gasto" ? "-" : "+"}${item.monto.toFixed(2)}
          </Text>
          <Text style={styles.fecha}>
            {new Date(item.fecha).toLocaleString()}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 6,
    borderRadius: 5,
  },
  descripcion: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingreso: {
    color: "#4caf50",
  },
  gasto: {
    color: "#f44336",
  },
  fecha: {
    fontSize: 12,
    color: "#999",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});

export default TransactionList;
