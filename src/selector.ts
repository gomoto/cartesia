import { createSelector } from 'reselect';
import { State, CartesianObject } from './state';
import { sumBy as _sumBy } from 'lodash';

export function getObjects(state: State): CartesianObject[] {
  return state.objects;
}

export const countObjects = createSelector(
  [getObjects],
  (objects) => {
    return objects.length;
  }
)

export const countSelectedObjects = createSelector(
  [getObjects],
  (objects) => {
    return _sumBy<CartesianObject>(objects, o => o.isSelected ? 1 : 0);
  }
)
