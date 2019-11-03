import { createStore } from 'redux'

import rootReducer from './Reducers'

export const store = createStore(rootReducer)

//convert to context api
// https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c
