import { REVEALED_CLASSNAMES } from './constants';

export function pickRandomPlayer() {
    const number = Math.floor((Math.random() * 100) + 1);
    if (number%2 == 0) {
        return REVEALED_CLASSNAMES.red
    } else {
        return REVEALED_CLASSNAMES.blue
    }
}