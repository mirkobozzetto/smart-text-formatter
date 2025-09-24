import { useState, useCallback } from "react";
import { UndoRedoState } from "../types";

export const useUndoRedo = <T>(initialValue: T) => {
  const [state, setState] = useState<UndoRedoState<T>>({
    history: [initialValue],
    currentIndex: 0,
  });

  const current = state.history[state.currentIndex];
  const canUndo = state.currentIndex > 0;
  const canRedo = state.currentIndex < state.history.length - 1;

  const push = useCallback((newValue: T) => {
    setState((prevState) => {
      // Remove any future history when pushing a new value
      const newHistory = [
        ...prevState.history.slice(0, prevState.currentIndex + 1),
        newValue,
      ];

      // Limit history to prevent memory issues (keep last 50 states)
      const trimmedHistory = newHistory.slice(-50);

      return {
        history: trimmedHistory,
        currentIndex: trimmedHistory.length - 1,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentIndex: Math.max(0, prevState.currentIndex - 1),
    }));
  }, []);

  const redo = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentIndex: Math.min(
        prevState.history.length - 1,
        prevState.currentIndex + 1
      ),
    }));
  }, []);

  const reset = useCallback(
    (newInitialValue?: T) => {
      const resetValue = newInitialValue ?? initialValue;
      setState({
        history: [resetValue],
        currentIndex: 0,
      });
    },
    [initialValue]
  );

  return {
    current,
    push,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
  };
};
