import * as redux from 'redux';
import { Vector3, CartesianGrid, HexColor3 } from './state';

export type Action = (
  AddSphereAction |
  AddLineAction |
  RemoveSelectedObjectsAction |
  RemoveAllObjectsAction |
  SelectObjectAction |
  UnselectObjectAction |
  TranslateSelectedObjectsAction |
  ChangeSpherePositionAction |
  ChangeSphereScalingAction |
  ChangeSphereIsScalingProportionalAction |
  ChangeObjectColorAction |
  ChangeLineStartAction |
  ChangeLineEndAction |
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

export interface AddLineAction extends redux.Action {
  type: 'ADD_LINE';
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

export interface ChangeSphereScalingAction extends redux.Action {
  type: 'CHANGE_SPHERE_SCALING';
  payload: {
    objectId: string;
    scaling: Vector3;
  }
}

export interface ChangeSphereIsScalingProportionalAction extends redux.Action {
  type: 'CHANGE_SPHERE_IS_SCALING_PROPORTIONAL';
  payload: {
    objectId: string;
    isScalingProportional: boolean;
  }
}

export interface ChangeObjectColorAction extends redux.Action {
  type: 'CHANGE_OBJECT_COLOR';
  payload: {
    objectId: string;
    color: HexColor3;
  }
}

export interface ChangeLineStartAction extends redux.Action {
  type: 'CHANGE_LINE_START';
  payload: {
    objectId: string;
    start: Vector3;
  }
}

export interface ChangeLineEndAction extends redux.Action {
  type: 'CHANGE_LINE_END';
  payload: {
    objectId: string;
    end: Vector3;
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
