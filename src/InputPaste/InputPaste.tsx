import * as React from 'react';
import { Button, Tooltip } from 'antd';
import './InputPaste.css';

export interface InputPasteProps {
  onPaste(pastedContent: string): void;
}

/**
 * User can paste content into this component.
 */
export class InputPaste extends React.Component<InputPasteProps> {
  private onPaste(event: ClipboardEvent): void {
    this.props.onPaste(event.clipboardData.getData('Text'));
  }

  render() {
    return (
      <div className="InputPaste">
        <input
          type="text"
          className="InputPaste-input"
          value=""
          onChange={() => { /* do nothing */}}
          onPaste={(event) => this.onPaste(event as any)}
        />
        <Button className="InputPaste-button" icon="snippets" />
      </div>
    );
  }
}
