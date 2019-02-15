import * as React from 'react';
import { Dropdown, Menu } from 'antd';
import './MenuBar.css';

export interface MenuBarProps {
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
          <Menu.Item className="MenuBar-MenuItem">
            <span>Remove selected objects</span>
            <span className="MenuBar-MenuItem-shortcut">Delete</span>
          </Menu.Item>
          <Menu.Item className="MenuBar-MenuItem">
            <span>Remove all objects</span>
            <span className="MenuBar-MenuItem-shortcut">Delete</span>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Divider />
        <Menu.Item className="MenuBar-MenuItem" disabled>Add plane</Menu.Item>
        <Menu.Item className="MenuBar-MenuItem">Add sphere</Menu.Item>
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
        <Menu.Item className="MenuBar-MenuItem">
          <span>Undo</span>
          <span className="MenuBar-MenuItem-shortcut">⌘Z</span>
        </Menu.Item>
        <Menu.Item className="MenuBar-MenuItem">
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
