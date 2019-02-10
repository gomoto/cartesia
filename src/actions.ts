import * as redux from 'redux';

export type Action = (
  AddPoint
);

export interface AddPoint extends redux.Action {
  type: 'ADD_POINT';
  payload: {
    x: number;
    y: number;
    z: number;
  }
}
