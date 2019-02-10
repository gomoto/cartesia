import * as redux from 'redux';

export type Action = (
  AddPoint |
  AddManyPoints |
  RemoveOnePoint |
  RemoveAllPoints
);

export interface AddPoint extends redux.Action {
  type: 'ADD_POINT';
  payload: {
    x: number;
    y: number;
    z: number;
  }
}

export interface AddManyPoints extends redux.Action {
  type: 'ADD_MANY_POINTS';
  payload: {
    numberOfPoints: number;
  }
}

export interface RemoveOnePoint extends redux.Action {
  type: 'REMOVE_ONE_POINT';
}

export interface RemoveAllPoints extends redux.Action {
  type: 'REMOVE_ALL_POINTS';
}
