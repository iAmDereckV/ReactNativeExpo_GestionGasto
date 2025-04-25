import React from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import { useTransactions } from "../context/TransactionsContext";

const TransactionActions = () => {
  const { borrarTodo } = useTransactions();

  const handleBorrar = () => {
    Alert.alert(
      "¿Borrar todo?",
      "¿Estás seguro de que deseas eliminar todos los registros?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí, borrar", style: "destructive", onPress: borrarTodo },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button
        title="Borrar Todos los Registros"
        color="#e53935"
        onPress={handleBorrar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

export default TransactionActions;
