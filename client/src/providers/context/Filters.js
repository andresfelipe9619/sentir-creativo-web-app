import React, { useReducer, useContext, useCallback } from "react";
const initialState = {
  showCards: false,
  showFilters: true,
};

const FiltersStateContext = React.createContext();
const FiltersDispatchContext = React.createContext();

function filtersReducer(state, { type, toggleValue }) {
  switch (type) {
    case "toggleCardsView": {
      return {
        ...state,
        showCards: toggleValue ?? !state.showCards,
      };
    }
    case "toggleFilters": {
      return {
        ...state,
        showFilters: toggleValue ?? !state.showFilters,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function FiltersContext({ children }) {
  const [state, dispatch] = useReducer(filtersReducer, initialState);
  const toggleCardsView = useCallback(
    (props) => dispatch({ type: "toggleCardsView", ...props }),
    []
  );
  const toggleFilters = useCallback(
    (props) => dispatch({ type: "toggleFilters", ...props }),
    []
  );
  return (
    <FiltersStateContext.Provider value={state}>
      <FiltersDispatchContext.Provider
        value={{ toggleCardsView, toggleFilters }}
      >
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersStateContext.Provider>
  );
}

function withAlertDispatch(Component) {
  return function WrapperComponent(props) {
    return (
      <FiltersDispatchContext.Consumer>
        {(dispatchProps) => <Component {...{ ...props, ...dispatchProps }} />}
      </FiltersDispatchContext.Consumer>
    );
  };
}

function useFiltersState() {
  const context = useContext(FiltersStateContext);
  if (context === undefined) {
    throw new Error(
      "Filters state Context must be used within an Filters Provider"
    );
  }
  return context;
}

function useFiltersDispatch() {
  const context = React.useContext(FiltersDispatchContext);
  if (context === undefined) {
    throw new Error(
      "Filters dispatch Context must be used within a Filters Provider"
    );
  }
  return context;
}

function useFilters() {
  return [useFiltersState(), useFiltersDispatch()];
}

export {
  FiltersContext,
  useFilters,
  withAlertDispatch,
  useFiltersState,
  useFiltersDispatch,
  FiltersDispatchContext,
};
