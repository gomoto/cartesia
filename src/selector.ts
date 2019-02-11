import { createSelector } from 'reselect';
import { State, CartesianObject } from './state';

export function getObjects(state: State): CartesianObject[] {
  return state.objects;
}
