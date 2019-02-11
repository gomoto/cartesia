import { State, CartesianPoint, CartesianObject } from './state';
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
        isSelected: false,
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
          isSelected: true,
          position: {
            x: parseFloat((5 * Math.random()).toFixed(3)),
            y: parseFloat((5 * Math.random()).toFixed(3)),
            z: parseFloat((5 * Math.random()).toFixed(3)),
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
    case 'SELECT_OBJECT': {
      const objects = state.objects;
      const newObjects = objects.map(o => {
        if (o.id === action.payload.objectId) {
          if (!o.isSelected) {
            return {
              ...o,
              isSelected: true,
            };
          }
        }
        return o;
      });
      return {
        ...state,
        objects: newObjects,
      };
    }
    case 'UNSELECT_OBJECT': {
      const objects = state.objects;
      const newObjects = objects.map(o => {
        if (o.id === action.payload.objectId) {
          if (o.isSelected) {
            return {
              ...o,
              isSelected: false,
            };
          }
        }
        return o;
      });
      return {
        ...state,
        objects: newObjects,
      };
    }
    case 'CHANGE_POINT_POSITION': {
      const newObjects = state.objects.map(o => {
        if (o.id === action.payload.objectId) {
          // action implies object is CartesianPoint
          const point = o as CartesianPoint;
          return {
            ...point,
            position: action.payload.position,
          };
        }
        return o;
      });
      return {
        ...state,
        objects: newObjects,
      };
    }
    default: {
      return state;
    }
  }
}
