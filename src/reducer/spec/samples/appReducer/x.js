'use strict';

import * as AstxReduxUtil from '../../../../index'; // REALLY: 'astx-redux-util'

const reduceX = AstxReduxUtil.reducerHash({
  "widget.edit.x.increment": (x, action) => x+1,
  "widget.edit.x.decrement": (x, action) => x-1,
});

export default function x(x=0, action) {
  return reduceX(x, action);
}