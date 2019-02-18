import { State, CartesianSphere } from './state';
import { Action } from './actions';
const uuidv4 = require('uuid/v4');

const initialState: State = {
  backgroundColor: '#E5E5E5',
  selectionColor: '#00FF00',
  grid: {
    isVisible: true,
    xMin: -8,
    xMax: 8,
    xStepMinor: 4,
    xStepMajor: 8,
    yMin: -8,
    yMax: 8,
    yStepMinor: 4,
    yStepMajor: 8,
    zMin: -8,
    zMax: 8,
    zStepMinor: 4,
    zStepMajor: 8,
    colorMinor: '#CCCCCC',
    colorMajor: '#999999',
  },
  objects: [],
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'ADD_SPHERE': {
      const newSphere: CartesianSphere = {
        id: uuidv4(),
        objectType: 'sphere',
        isSelected: false,
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        scaling: {
          x: 2,
          y: 2,
          z: 2,
        },
      };
      const newObjects = [
        ...state.objects,
        newSphere,
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
    case 'TRANSLATE_SELECTED_OBJECTS': {
      const newObjects = state.objects.map(o => {
        if (o.isSelected) {
          const { dx = 0, dy = 0, dz = 0 } = action.payload;
          switch (o.objectType) {
            case 'sphere': {
              return {
                ...o,
                position: {
                  x: o.position.x + dx,
                  y: o.position.y + dy,
                  z: o.position.z + dz,
                }
              };
            }
          }
        }
        return o;
      });
      return {
        ...state,
        objects: newObjects,
      };
    }
    case 'CHANGE_SPHERE_POSITION': {
      const newObjects = state.objects.map(o => {
        if (o.id === action.payload.objectId) {
          // action implies object is CartesianSphere
          const sphere = o as CartesianSphere;
          return {
            ...sphere,
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
    case 'CHANGE_BACKGROUND_COLOR': {
      return {
        ...state,
        backgroundColor: action.payload.color,
      };
    }
    case 'CHANGE_SELECTION_COLOR': {
      return {
        ...state,
        selectionColor: action.payload.color,
      };
    }
    default: {
      return state;
    }
  }
}
