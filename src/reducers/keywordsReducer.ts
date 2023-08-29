export type Keywords = {
  primaryKeywords: Array<string>;
  secondaryKeywords: Array<string>;
  exclusionKeywords: Array<string>;
}

export type KeywordsAction = {
  type: string;
  value: any;
}

export const KEYWORDS_ACTIONS = {
  SET_PRIMARY_KEYWORDS: 'SET_PRIMARY_KEYWORDS',
  SET_SECONDARY_KEYWORDS: 'SET_SECONDARY_KEYWORDS',
  SET_EXCLUSION_KEYWORDS: 'SET_EXCLUSION_KEYWORDS'
};

/**
 * 
 * @param state 
 * @param action 
 * @returns 
 */
function keywordsReducer(state: Keywords, action: KeywordsAction): Keywords {
  switch(action.type) {
  case KEYWORDS_ACTIONS.SET_PRIMARY_KEYWORDS:
    return {
      ...state,
      primaryKeywords: action.value
    };
  case KEYWORDS_ACTIONS.SET_SECONDARY_KEYWORDS:
    return {
      ...state,
      secondaryKeywords: action.value
    };
  case KEYWORDS_ACTIONS.SET_EXCLUSION_KEYWORDS:
    return {
      ...state,
      exclusionKeywords: action.value
    };
  default:
    return state;
  }
}

export const initialKeywords: Keywords = {
  primaryKeywords: [],
  secondaryKeywords: [],
  exclusionKeywords: []
};

export default keywordsReducer;