import React, { useReducer, useContext, useCallback } from 'react'
const initialState = {
  message: 'Welocome Back To Brooklyn!',
  duration: 5000,
  variant: 'success',
  open: false,
  customAction: () => null
}

const AlertStateContext = React.createContext()
const AlertDispatchContext = React.createContext()

function alertReducer (
  state,
  { type, message, duration, variant, customAction }
) {
  const isSuccess = variant === 'success'
  duration = duration ? duration : isSuccess ? 5000 : 20000
  switch (type) {
    case 'open': {
      return {
        open: true,
        message,
        variant,
        duration,
        customAction
      }
    }
    case 'close': {
      return { ...state, open: false, message: '', customAction: () => null }
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}
function AlertContext ({ children }) {
  const [state, dispatch] = useReducer(alertReducer, initialState)
  const openAlert = useCallback(
    props => dispatch({ type: 'open', ...props }),
    []
  )
  const closeAlert = useCallback(() => dispatch({ type: 'close' }), [])
  return (
    <AlertStateContext.Provider value={state}>
      <AlertDispatchContext.Provider value={{ openAlert, closeAlert }}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertStateContext.Provider>
  )
}

function withAlertDispatch (Component) {
  return function WrapperComponent (props) {
    return (
      <AlertDispatchContext.Consumer>
        {({ openAlert, closeAlert }) => (
          <Component {...{ ...props, openAlert, closeAlert }} />
        )}
      </AlertDispatchContext.Consumer>
    )
  }
}

function useAlertState () {
  const context = useContext(AlertStateContext)
  if (context === undefined) {
    throw new Error('Alert state Context must be used within an Alert Provider')
  }
  return context
}

function useAlertDispatch () {
  const context = React.useContext(AlertDispatchContext)
  if (context === undefined) {
    throw new Error(
      'Alert dispatch Context must be used within a Alert Provider'
    )
  }
  return context
}
function useAlert () {
  return [useAlertState(), useAlertDispatch()]
}
export {
  AlertContext,
  useAlert,
  withAlertDispatch,
  useAlertState,
  useAlertDispatch,
  AlertDispatchContext
}
