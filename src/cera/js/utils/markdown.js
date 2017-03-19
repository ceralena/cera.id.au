// @flow
import remark from 'remark';
import reactRenderer from 'remark-react';

const renderer = remark().use(reactRenderer);

export function render(text: string) {
    return renderer.processSync(text).contents;
}
