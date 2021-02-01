import {qs} from '../utils.js';

const loader = qs('.loader');

export const showLoader = () => loader.classList.remove('hide');
export const hideLoader = () => loader.classList.add('hide');
