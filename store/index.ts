import { createState, useState } from '@hookstate/core';

const initialState = {
  focusing: '',
  compProps: {} as { [id: string]: object }
};

const globalState = createState(initialState);

export default globalState;

export const useGlobalState = useState;