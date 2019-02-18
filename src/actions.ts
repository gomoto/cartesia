import * as redux from 'redux';
import { Vector3, CartesianGrid, HexColor3 } from './state';

export type Action = (
  AddSphereAction |
  RemoveSelectedObjectsAction |
  RemoveAllObjectsAction |
  SelectObjectAction |
  UnselectObjectAction |
  TranslateSelectedObjectsAction |
  ChangeSpherePositionAction |
  ChangeGridAction |
  ChangeBackgroundColorAction |
  ChangeSelectionColorAction
);

/**
 * Add new sphere at (0, 0, 0)
 */
export interface AddSphereAction extends redux.Action {
  type: 'ADD_SPHERE';
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

export interface ChangeSpherePositionAction extends redux.Action {
  type: 'CHANGE_SPHERE_POSITION';
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
    color: HexColor3;
  }
}

export interface ChangeSelectionColorAction extends redux.Action {
  type: 'CHANGE_SELECTION_COLOR';
  payload: {
    color: HexColor3;
  }
}
