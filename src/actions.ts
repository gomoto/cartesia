import * as redux from 'redux';

export type Action = (
  AddPoint |
  RemoveAnyPoint
);

export interface AddPoint extends redux.Action {
  type: 'ADD_POINT';
  payload: {
    x: number;
    y: number;
    z: number;
  }
}

export interface RemoveAnyPoint extends redux.Action {
  type: 'REMOVE_ANY_POINT';
}
