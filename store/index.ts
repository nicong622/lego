import { createState, useState } from '@hookstate/core';

const initialState = {
  focusing: ''
};

const globalState = createState(initialState);

export default globalState;
export const useGlobalState = useState;