import { State, CartesianPoint } from './state';
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
    case 'ADD_MANY_POINTS': {
      const addedPoints: CartesianPoint[] = [];
      for (let i = 0; i < action.payload.numberOfPoints; i++) {
        addedPoints.push({
          id: uuidv4(),
          x: 5 * Math.random(),
          y: 5 * Math.random(),
          z: 5 * Math.random(),
        });
      }
      const newPoints = [
        ...state.points,
        ...addedPoints,
      ];
      return {
        ...state,
        points: newPoints,
      };
    }
    case 'REMOVE_ONE_POINT': {
      const [_removedPoint0, ...newPoints] = state.points;
      return {
        ...state,
        points: newPoints,
      };
    }
    case 'REMOVE_ALL_POINTS': {
      return {
        ...state,
        points: [],
      };
    }
    default: {
      return state;
    }
  }
}
