import { createSelector } from 'reselect';
import { State, CartesianPoint } from './state';

export function getPoints(state: State): CartesianPoint[] {
  return state.points;
}
