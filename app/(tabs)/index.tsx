import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { TransactionsProvider } from "@/context/TransactionsContext";
import TransactionModal from "@/components/TransactionForm";
import TransactionActions from "@/components/TransactionActions";
import TransactionList from "@/components/TransactionList";
import Summary from "@/components/Summary";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TransactionsProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Gestión de Gastos</Text>

        {/* Botón para abrir el modal */}
        <Button title="Crear Movimiento" onPress={() => setModalVisible(true)} />

        {/* Modal con el formulario */}
        <TransactionModal visible={modalVisible} onClose={() => setModalVisible(false)} />

        <TransactionActions />
        <Summary />
        <TransactionList />
      </View>
    </TransactionsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    paddingTop: 20,
    marginTop: 50,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
