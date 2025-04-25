// App.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TransactionsProvider } from "@/context/TransactionsContext";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import TransactionActions from "@/components/TransactionActions";
import Summary from "@/components/Summary";

export default function App() {
  return (
    <TransactionsProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Gestión de Gastos</Text>
        <TransactionForm />
        <TransactionActions />
        <Summary />
        <TransactionList />
      </View>
    </TransactionsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "20%",
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
