import * as redux from 'redux';

export type Action = (
  AddPointAction |
  AddManyPoints |
  RemoveOnePoint |
  RemoveAllPoints |
  SelectObjectAction |
  UnselectObjectAction
);

/**
 * Add new point at (0, 0, 0)
 */
export interface AddPointAction extends redux.Action {
  type: 'ADD_POINT';
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

export interface SelectObjectAction extends redux.Action {
  type: 'SELECT_OBJECT';
  payload: {
    objectId: string;
  }
}

export interface UnselectObjectAction extends redux.Action {
  type: 'UNSELECT_OBJECT';
  payload: {
    objectId: string;
  }
}
