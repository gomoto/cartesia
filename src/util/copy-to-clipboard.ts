// https://www.npmjs.com/package/clipboard
const Clipboard = require('clipboard');

export interface ClipboardObjectVector3 {
  type: 'Vector3';
  data: {
    x: number;
    y: number;
    z: number;
  };
}

export type ClipboardObject = (
  ClipboardObjectVector3
);

export function copyToClipboard(o: ClipboardObject): void {
  const button = document.createElement('button');
  const clipboard = new Clipboard(button, {
    text: () => JSON.stringify(o)
  });
  button.click();
  clipboard.destroy();
}
