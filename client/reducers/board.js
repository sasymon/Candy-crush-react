import { SET_BOARD } from '../actions'

const initialState = []

export default function board (state = initialState, actions) {
  switch (actions.type) {
    case SET_BOARD:
      return actions.board
    default:
      return state
  }
}
