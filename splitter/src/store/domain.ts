export const SPLITTING_NAMESPACE = 'splitting'

export interface SplittingState {
  secret: string;
  shareCount: number;
  threshold: number;
}

export const GET_SHARES = 'shares'

export const SET_SECRET = 'setSecret'
export const SET_SHARE_COUNT = 'setShareCount'
export const SET_THRESHOLD = 'setThreshold'

export const COMBINING_NAMESPACE = 'combining'

export interface CombiningState {
  input: string;
}

export const GET_COMBINATION = 'combination'
export const SET_COMBINING_INPUT = 'setCombiningInput'

export const SNACKBAR_NAMESPACE = 'snackbar'

export interface SnackbarState {
  text: string;
  indicator: boolean;
}

export const SHOW_SNACKBAR = 'showSnackbar'
export const HIDE_SNACKBAR = 'hideSnackbar'

export interface RootState {
  splitting: SplittingState;
  combining: CombiningState;
}
