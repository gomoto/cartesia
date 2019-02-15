import * as React from 'react';
import { Dropdown, Menu } from 'antd';
import './MenuBar.css';

export interface MenuBarProps {
  onAddPoint(): void;
  onRemoveAllObjects(): void;
  onRemoveSelectedObjects(): void;
  canRemoveSelectedObjects: boolean;
  onUndo(): void;
  canUndo: boolean;
  onRedo(): void;
  canRedo: boolean;
}

export class MenuBar extends React.Component<MenuBarProps> {
  render() {
    const mainMenu = (
      <Menu>
        <Menu.Item className="MenuBar-MenuItem">About</Menu.Item>
        <Menu.Item className="MenuBar-MenuItem">Source code</Menu.Item>
      </Menu>
    );
    const objectMenu = (
      <Menu>
        <Menu.SubMenu title="Remove">
          <Menu.Item className="MenuBar-MenuItem" onClick={this.props.onRemoveSelectedObjects.bind(this)} disabled={!this.props.canRemoveSelectedObjects}>
            <span>Remove selected objects</span>
            <span className="MenuBar-MenuItem-shortcut">Delete</span>
          </Menu.Item>
          <Menu.Item className="MenuBar-MenuItem" onClick={this.props.onRemoveAllObjects.bind(this)}>
            <span>Remove all objects</span>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.Item className="MenuBar-MenuItem" disabled>Add plane</Menu.Item>
        <Menu.Item className="MenuBar-MenuItem" onClick={this.props.onAddPoint.bind(this)}>Add sphere</Menu.Item>
        <Menu.Item className="MenuBar-MenuItem" disabled>Add tube</Menu.Item>
        <Menu.Divider />
        <Menu.Item className="MenuBar-MenuItem" disabled>Add directional light</Menu.Item>
        <Menu.Item className="MenuBar-MenuItem" disabled>Add hemispheric light</Menu.Item>
        <Menu.Item className="MenuBar-MenuItem" disabled>Add point light</Menu.Item>
        <Menu.Item className="MenuBar-MenuItem" disabled>Add spot light</Menu.Item>
        <Menu.Divider />
        <Menu.Item className="MenuBar-MenuItem" disabled>Add camera</Menu.Item>
      </Menu>
    );
    const editMenu = (
      <Menu>
        <Menu.Item className="MenuBar-MenuItem" onClick={this.props.onUndo.bind(this)} disabled={!this.props.canUndo}>
          <span>Undo</span>
          <span className="MenuBar-MenuItem-shortcut">⌘Z</span>
        </Menu.Item>
        <Menu.Item className="MenuBar-MenuItem" onClick={this.props.onRedo.bind(this)} disabled={!this.props.canRedo}>
          <span>Redo</span>
          <span className="MenuBar-MenuItem-shortcut">⇧⌘Z</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="MenuBar">
        <Dropdown overlay={mainMenu}>
          <span className="MenuBar-link MenuBar-main-link">Cartesia</span>
        </Dropdown>
        <Dropdown overlay={objectMenu}>
          <span className="MenuBar-link">Object</span>
        </Dropdown>
        <Dropdown overlay={editMenu}>
          <span className="MenuBar-link">Edit</span>
        </Dropdown>
      </div>
    );
  }
}
