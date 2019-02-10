import { State } from './state';
import { Action } from './actions';
const uuidv4 = require('uuid/v4');

const initialState: State = {
  points: [],
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'ADD_POINT': {
      const newPoint = {
        id: uuidv4(),
        x: action.payload.x,
        y: action.payload.y,
        z: action.payload.z,
      };
      const newPoints = [
        ...state.points,
        newPoint,
      ];
      return {
        ...state,
        points: newPoints,
      };
    }
    default: {
      return state;
    }
  }
}
