import React, { useState, useEffect } from "react";
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
import { Movimiento } from "../context/TransactionsContext";

interface Props {
  visible: boolean;
  onClose: () => void;
  movimientoEditar?: Movimiento | null;
}

const TransactionModal = ({ visible, onClose, movimientoEditar }: Props) => {
  const { agregarMovimiento, editarMovimiento } = useTransactions();
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<"ingreso" | "gasto">("gasto");

  useEffect(() => {
    if (movimientoEditar) {
      setDescripcion(movimientoEditar.descripcion);
      setMonto(movimientoEditar.monto.toString());
      setTipo(movimientoEditar.tipo);
    } else {
      setDescripcion("");
      setMonto("");
      setTipo("gasto");
    }
  }, [movimientoEditar]);

  useEffect(() => {
  if (!visible) {
    setDescripcion("");
    setMonto("");
    setTipo("gasto");
  }
}, [visible]);

  const handleSubmit = () => {
    if (!descripcion || !monto) return;

    if (movimientoEditar) {
      editarMovimiento({
        ...movimientoEditar,
        descripcion,
        monto: parseFloat(monto),
        tipo,
      });
    } else {
      agregarMovimiento(tipo, descripcion, parseFloat(monto));
    }

    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            {movimientoEditar ? "Editar Movimiento" : "Crear Movimiento"}
          </Text>

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

          <Button
            title={movimientoEditar ? "Guardar Cambios" : "Agregar Movimiento"}
            onPress={handleSubmit}
          />

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
