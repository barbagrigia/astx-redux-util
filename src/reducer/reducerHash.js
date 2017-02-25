'use strict';

import reducerPassThrough  from './reducerPassThrough';

/**
 * Create a higher-order reducer by combining a set of sub-reducer
 * functions that are indexed by the standard action.type.  When no
 * action.type is acted on, the original state is merely
 * passed-through.
 *
 * This is one of the more prevalent composition reducers, and
 * provides an alternative to the switch statement (commonly used to
 * provide this control mechanism).
 * 
 * The **User Guide** discusses reducerHash() in more detail (see
 * {@tutorial conceptHash}), and additional examples can be found in
 * {@tutorial conceptJoin} and {@tutorial fullExample}.
 *
 * **NOTE**: Because this function is so central to the rudimentary aspects of
 * reduction, it is common to provide a value-added {@tutorial logExt}.
 *
 * @param {ActionReducerHash} actionHandlers - a hash of reducer functions,
 * indexed by the standard redux action.type.
 * 
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function reducerHash(actionHandlers) {

  // TODO: consider validation of actionHandlers param.

  const locateHandler = (action) => actionHandlers[action.type] || reducerPassThrough;

  // expose the new reducer fn, which resolves according the the supplied hash
  return (state, action) => locateHandler(action)(state, action);
}



//***
//*** Specification: ActionReducerHash
//***

/**
 * @typedef {Object} ActionReducerHash
 *
 * A hash of reducer functions, indexed by the standard redux
 * action.type.
 *
 * @property {reducerFn} actionType1 - The reducer function servicing: 'actionType1'.
 * @property {reducerFn} actionType2 - The reducer function servicing: 'actionType2'.
 * @property {reducerFn} ...more - ...etc.
 */
