import { State, CartesianPoint, CartesianObject } from './state';
import { Action } from './actions';
const uuidv4 = require('uuid/v4');

const initialState: State = {
  grid: {
    xMin: -8,
    xMax: 8,
    xStep: 4,
    yMin: -8,
    yMax: 8,
    yStep: 4,
    zMin: -8,
    zMax: 8,
    zStep: 4,
    color: {
      r: 0.4,
      g: 0.4,
      b: 0.4,
    },
  },
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
    case 'REMOVE_SELECTED_OBJECTS': {
      const newObjects = state.objects.filter((o) => !o.isSelected);
      return {
        ...state,
        objects: newObjects,
      };
    }
    case 'REMOVE_ALL_OBJECTS': {
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
    case 'CHANGE_GRID': {
      return {
        ...state,
        grid: action.payload.grid,
      };
    }
    default: {
      return state;
    }
  }
}
