import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useTransactions } from "../context/TransactionsContext";

const TransactionForm = () => {
  const { agregarMovimiento } = useTransactions();
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<"ingreso" | "gasto">("gasto");

  const handleAgregar = () => {
    if (!descripcion || !monto) return;
    agregarMovimiento(tipo, descripcion, parseFloat(monto));
    setDescripcion("");
    setMonto("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <View style={styles.buttonGroup}>
        <Button
          title="Gasto"
          onPress={() => setTipo("gasto")}
          color={tipo === "gasto" ? "#f44336" : "#ccc"}
        />
        <Button
          title="Ingreso"
          onPress={() => setTipo("ingreso")}
          color={tipo === "ingreso" ? "#4caf50" : "#ccc"}
        />
      </View>
      <Button title="Agregar Movimiento" onPress={handleAgregar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    gap: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
});

export default TransactionForm;
