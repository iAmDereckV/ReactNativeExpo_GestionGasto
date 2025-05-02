import React, { createContext, useContext, useState } from "react";
import { getToday, getMonth } from "../utils/dateUtils";
import { v4 as uuidv4 } from "../utils/uuid";

export type TipoMovimiento = "ingreso" | "gasto";

export interface Movimiento {
  id: string;
  tipo: TipoMovimiento;
  descripcion: string;
  monto: number;
  fecha: string; // formato ISO
}

interface TransactionsContextType {
  movimientos: Movimiento[];
  agregarMovimiento: (
    tipo: TipoMovimiento,
    descripcion: string,
    monto: number
  ) => void;
  editarMovimiento: (movimientoEditado: Movimiento) => void;
  eliminarMovimiento: (id: string) => void;
  borrarTodo: () => void;
  ingresosTotales: number;
  gastosTotales: number;
  balance: number;
  getMovimientosHoy: () => Movimiento[];
  getMovimientosMes: () => Movimiento[];
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const agregarMovimiento = (
    tipo: TipoMovimiento,
    descripcion: string,
    monto: number
  ) => {
    const nuevo: Movimiento = {
      id: uuidv4(),
      tipo,
      descripcion,
      monto,
      fecha: new Date().toISOString(),
    };
    setMovimientos([...movimientos, nuevo]);
  };

  const editarMovimiento = (movimientoEditado: Movimiento) => {
    setMovimientos((prev) =>
      prev.map((m) => (m.id === movimientoEditado.id ? movimientoEditado : m))
    );
  };

  const eliminarMovimiento = (id: string) => {
    setMovimientos((prev) => prev.filter((m) => m.id !== id));
  };

  const borrarTodo = () => {
    setMovimientos([]);
  };

  const ingresosTotales = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((acc, m) => acc + m.monto, 0);

  const gastosTotales = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((acc, m) => acc + m.monto, 0);

  const getMovimientosHoy = () => {
    const hoy = getToday();
    return movimientos.filter((m) => m.fecha.startsWith(hoy));
  };

  const getMovimientosMes = () => {
    const mes = getMonth();
    return movimientos.filter((m) => m.fecha.startsWith(mes));
  };

  return (
    <TransactionsContext.Provider
      value={{
        movimientos,
        agregarMovimiento,
        editarMovimiento,
        eliminarMovimiento,
        borrarTodo,
        ingresosTotales,
        gastosTotales,
        balance: ingresosTotales - gastosTotales,
        getMovimientosHoy,
        getMovimientosMes,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions debe usarse dentro de TransactionsProvider"
    );
  }
  return context;
};
