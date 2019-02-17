import * as redux from 'redux';
import { Vector3, CartesianGrid, Color3 } from './state';

export type Action = (
  AddPointAction |
  RemoveSelectedObjectsAction |
  RemoveAllObjectsAction |
  SelectObjectAction |
  UnselectObjectAction |
  TranslateSelectedObjectsAction |
  ChangePointPositionAction |
  ChangeGridAction |
  ChangeBackgroundColorAction
);

/**
 * Add new point at (0, 0, 0)
 */
export interface AddPointAction extends redux.Action {
  type: 'ADD_POINT';
}

export interface RemoveSelectedObjectsAction extends redux.Action {
  type: 'REMOVE_SELECTED_OBJECTS';
}

export interface RemoveAllObjectsAction extends redux.Action {
  type: 'REMOVE_ALL_OBJECTS';
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

export interface TranslateSelectedObjectsAction extends redux.Action {
  type: 'TRANSLATE_SELECTED_OBJECTS';
  payload: {
    dx?: number;
    dy?: number;
    dz?: number;
  }
}

export interface ChangePointPositionAction extends redux.Action {
  type: 'CHANGE_POINT_POSITION';
  payload: {
    objectId: string;
    position: Vector3;
  }
}

export interface ChangeGridAction extends redux.Action {
  type: 'CHANGE_GRID';
  payload: {
    grid: CartesianGrid;
  }
}

export interface ChangeBackgroundColorAction extends redux.Action {
  type: 'CHANGE_BACKGROUND_COLOR';
  payload: {
    color: Color3;
  }
}
