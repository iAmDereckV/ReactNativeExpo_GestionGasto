// App.tsx
import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { TransactionsProvider } from "@/context/TransactionsContext";
import TransactionModal from "@/components/TransactionForm";
import TransactionActions from "@/components/TransactionActions";
import TransactionList from "@/components/TransactionList";
import Summary from "@/components/Summary";
import { Movimiento } from "@/context/TransactionsContext";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [movimientoEditar, setMovimientoEditar] = useState<Movimiento | null>(null);

  const abrirModalCrear = () => {
    setMovimientoEditar(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (movimiento: Movimiento) => {
    setMovimientoEditar(movimiento);
    setModalVisible(true);
  };

  return (
    <TransactionsProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Gestión de Gastos</Text>

        <Button title="Crear Movimiento" onPress={abrirModalCrear} />

        <TransactionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          movimientoEditar={movimientoEditar}
        />

        <TransactionActions />
        <Summary />
        <TransactionList onEdit={abrirModalEditar} />
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
