import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useTransactions } from "../context/TransactionsContext";

const TransactionModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const { agregarMovimiento } = useTransactions();
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<"ingreso" | "gasto">("gasto");

  const handleAgregar = () => {
    if (!descripcion || !monto) return;
    agregarMovimiento(tipo, descripcion, parseFloat(monto));
    setDescripcion("");
    setMonto("");
    onClose(); // Cierra el modal después de agregar
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Crear</Text>

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

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#007bff",
    fontSize: 16,
  },
});

export default TransactionModal;
