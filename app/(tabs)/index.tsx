import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

interface Movimiento {
  id: string;
  tipo: "ingreso" | "gasto";
  descripcion: string;
  monto: number;
}

export default function App() {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState<"ingreso" | "gasto">("ingreso");
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const agregarMovimiento = () => {
    if (!descripcion || !monto) return;
    const nuevoMovimiento: Movimiento = {
      id: Date.now().toString(),
      tipo,
      descripcion,
      monto: parseFloat(monto),
    };
    setMovimientos([...movimientos, nuevoMovimiento]);
    setDescripcion("");
    setMonto("");
  };

  const totalIngresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, cur) => acc + cur.monto, 0);
  const totalGastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, cur) => acc + cur.monto, 0);
  const balance = totalIngresos - totalGastos;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestión de Gastos</Text>

      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        placeholder="Monto"
        style={styles.input}
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Agregar Ingreso"
          onPress={() => {
            setTipo("ingreso");
            agregarMovimiento();
          }}
        />
        <Button
          title="Agregar Gasto"
          onPress={() => {
            setTipo("gasto");
            agregarMovimiento();
          }}
        />
      </View>

      <Text style={styles.sectionTitle}>Movimientos</Text>
      <FlatList
        data={movimientos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={item.tipo === "ingreso" ? styles.ingreso : styles.gasto}>
            {item.descripcion}: ${item.monto.toFixed(2)}
          </Text>
        )}
      />

      <Text style={styles.sectionTitle}>Informe</Text>
      <View>
        <Text style={styles.ingreso}>
          Total Ingresos: ${totalIngresos.toFixed(2)}
        </Text>
        <Text style={styles.gasto}>
          Total Gastos: ${totalGastos.toFixed(2)}
        </Text>
        <Text>Balance: ${balance.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  ingreso: {
    color: "green",
  },
  gasto: {
    color: "red",
  },
});
