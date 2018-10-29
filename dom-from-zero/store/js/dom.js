'use strict';

function createElement(template) {
  const tag = template.name;
  const props = template.props;
  const childs = template.childs;
  if (!props && !childs) {
    return document.createTextNode(tag);
  }
  const node = document.createElement(tag);
  if (props instanceof Object) {
    for (const key in props) {
      node.setAttribute(key, props[key]);
    }
  }
  for (const child of childs) {
    if (child instanceof Object) {
      node.appendChild(createElement(child));
    } else {
      node.textContent = child;
    }
  }
  return node;
}
