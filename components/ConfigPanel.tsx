import globalState, { useGlobalState } from 'store';
import { dynamicImport } from '@utils';
import type { ConfigProps } from '@types';
import { HTMLAttributes } from 'react';

const ConfigPanel: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const state = useGlobalState(globalState)
  const defaultState = state.compProps.nested(state.focusing.get())

  const compName = state.get().focusing.split('_')[0]
  const ConfigForm = compName ? dynamicImport<ConfigProps<object>>(`${compName}/config`) : 'div'

  function onChange(value: object) {
    defaultState.set(value)
  }

  return (
    <div className={props.className}>
      <p>focusing on {state.get().focusing}</p>

      <ConfigForm onChange={onChange} value={defaultState.get()} />
    </div>
  )
}

export default ConfigPanel