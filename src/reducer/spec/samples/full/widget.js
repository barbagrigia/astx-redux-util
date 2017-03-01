'use strict';

import * as Redux         from 'redux';
import * as AstxReduxUtil from '../../../../index'; // REALLY: 'astx-redux-util'
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';
import Widget             from '../appReducer/Widget';

// placeboReducer WITH state initialization (see NOTE below)
const placeboReducer = (state=null, action) => state;

const reduceWidget = 
  AstxReduxUtil.joinReducers(
    // FIRST: determine content shape (i.e. {} or null)
    AstxReduxUtil.reducerHash({
      "widget.edit":       (widget, action) => action.widget,
      "widget.edit.close": (widget, action) => null
    }),

    AstxReduxUtil.conditionalReducer(
      // NEXT: maintain individual x/y fields
      //       ONLY when widget has content (i.e. is being edited)
      (widget, action, originalReducerState) => widget !== null,
      AstxReduxUtil.joinReducers(
        Redux.combineReducers({
          x,
          y,
          curHash: placeboReducer
        }),
        AstxReduxUtil.conditionalReducer(
          // LAST: maintain curHash
          //       ONLY when widget has content (see condition above) -AND- has changed
          (widget, action, originalReducerState) => originalReducerState !== widget,
          (widget, action) => {
            widget.curHash = Widget.hash(widget); // OK to mutate (because of changed instance)
            return widget;
          })
      )
    )
  );

export default function widget(widget=null, action) {
  return reduceWidget(widget, action);
}

// NOTE: The placeboReducer is slightly different than lodash.identity
//       in that it defaults the state parameter to null.
//       This avoids the following Redux.combineReducers() issues:
//
//       - with NO curHash entry ... 
//             WARNING:
//             Unexpected key "curHash" found in previous state received by the reducer.
//             Expected to find one of the known reducer keys instead: "x", "y".
//             Unexpected keys will be ignored.
//
//       - with curHash entry, using lodash.identity ...
//             ERROR:
//             Reducer "curHash" returned undefined during initialization.
//             If the state passed to the reducer is undefined, you must explicitly return the initial state.
//             The initial state may not be undefined.
