import React, {
  useReducer,
  useContext,
  useCallback,
  createContext
} from 'react'
const initialState = null

const UserStateContext = createContext()
const UserDispatchContext = createContext()

function userReducer (_, { type, user }) {
  switch (type) {
    case 'login': {
      return user
    }
    case 'logout': {
      return initialState
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}
function UserContext ({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState)
  const login = useCallback(user => dispatch({ type: 'login', user }), [])
  const logout = useCallback(() => dispatch({ type: 'logout' }), [])

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={{ login, logout }}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function withUserDispatch (Component) {
  return function WrapperComponent (props) {
    return (
      <UserDispatchContext.Consumer>
        {({ login, logout }) => <Component {...{ ...props, login, logout }} />}
      </UserDispatchContext.Consumer>
    )
  }
}

function useUserState () {
  const context = useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('User state Context must be used within an User Provider')
  }
  return context
}

function useUserDispatch () {
  const context = useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('User dispatch Context must be used within a User Provider')
  }
  return context
}
function useUser () {
  return [useUserState(), useUserDispatch()]
}
export {
  UserContext,
  useUser,
  withUserDispatch,
  useUserState,
  useUserDispatch,
  UserDispatchContext
}
