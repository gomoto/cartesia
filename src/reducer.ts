import { State, CartesianPoint } from './state';
import { Action } from './actions';
const uuidv4 = require('uuid/v4');

const initialState: State = {
  objects: [],
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'ADD_POINT': {
      const newPoint: CartesianPoint = {
        id: uuidv4(),
        objectType: 'point',
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
      };
      const newObjects = [
        ...state.objects,
        newPoint,
      ];
      return {
        ...state,
        objects: newObjects,
      };
    }
    case 'ADD_MANY_POINTS': {
      const addedPoints: CartesianPoint[] = [];
      for (let i = 0; i < action.payload.numberOfPoints; i++) {
        addedPoints.push({
          id: uuidv4(),
          objectType: 'point',
          position: {
            x: 5 * Math.random(),
            y: 5 * Math.random(),
            z: 5 * Math.random(),
          }
        });
      }
      const newPoints = [
        ...state.objects,
        ...addedPoints,
      ];
      return {
        ...state,
        objects: newPoints,
      };
    }
    case 'REMOVE_ONE_POINT': {
      const [_removedPoint0, ...newPoints] = state.objects;
      return {
        ...state,
        objects: newPoints,
      };
    }
    case 'REMOVE_ALL_POINTS': {
      return {
        ...state,
        objects: [],
      };
    }
    default: {
      return state;
    }
  }
}
