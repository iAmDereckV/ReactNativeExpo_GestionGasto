import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTransactions } from "../context/TransactionsContext";
import { Movimiento } from "../context/TransactionsContext";

interface Props {
  onEdit: (movimiento: Movimiento) => void;
}

const TransactionList = ({ onEdit }: Props) => {
  const { movimientos, eliminarMovimiento } = useTransactions();

  if (movimientos.length === 0) {
    return <Text style={styles.empty}>No hay movimientos registrados.</Text>;
  }

  return (
    <FlatList
      data={movimientos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
              <Text
                style={item.tipo === "gasto" ? styles.gasto : styles.ingreso}
              >
                {item.tipo === "gasto" ? "-" : "+"}${item.monto.toFixed(2)}
              </Text>
              <Text style={styles.fecha}>
                {new Date(item.fecha).toLocaleString()}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.btnEditar}
                onPress={() => onEdit(item)}
              >
                <Text style={styles.btnText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnEliminar}
                onPress={() => eliminarMovimiento(item.id)}
              >
                <Text style={styles.btnText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  btnEditar: {
    backgroundColor: "#2196f3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
  },
  btnEliminar: {
    backgroundColor: "#f44336",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
  },
});

export default TransactionList;
