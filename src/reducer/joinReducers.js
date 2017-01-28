/*
 * @file
 * @author Kevin Bridges ({@link https://github.com/KevinAst/})
 * @copyright Copyright (c) 2017 Kevin Bridges
 * @license MIT (see: LICENSE project file)
 */

'use strict';

import poop from './nonExistant'; // ?? for some reason jsdoc will not output the doc for this module WITHOUT an import ... MAKES NO SENSE AT ALL

/**
 * Create a higher-order reducer by combining two or more reducers,
 * logically executing each in sequence (in essence combining their
 * functionality into one).  This is useful when combining various
 * reducer types into one logical construct.
 * 
 * ?? refer to examples of this being used
 *
 * @param {...reducerFn} reducerFns two or more reducer functions to join
 * together.
 * 
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function joinReducers(...reducerFns) {

  // TODO: consider validation of joinReducers() params ... two or more reducerFns

  // expose our new higher-order reducer
  return (state, action, originalReducerState) => {

    // maintain the originalReducerState as the immutable state
    // at the time of the start of the reduction process.
    // ... please refer to the User Guide {@tutorial originalReducerState}
    if (originalReducerState === undefined) {
      originalReducerState = state;
    }

    // execute each reducerFn in sequence
    return reducerFns.reduce( (nextState, reducerFn) => {
                                 return reducerFn(nextState, action, originalReducerState);
                               },
                               state);

  }
}