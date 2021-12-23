import globalState, { useGlobalState } from 'store';
import { dynamicImport } from '@utils';
import type { ConfigProps } from '@types';

interface PropsType {}

const ConfigPanel: React.FC<PropsType> = () => {
  const state = useGlobalState(globalState)
  const defaultState = state.compProps.nested(state.focusing.get())

  const compName = state.get().focusing.split('_')[0]
  const ConfigForm = compName ? dynamicImport<ConfigProps<object>>(`${compName}/config.tsx`) : 'div'

  function onChange(value: object) {
    defaultState.set(value)
  }

  return (
    <div>
      <p>focusing on {state.get().focusing}</p>

      <ConfigForm onChange={onChange} value={defaultState.get()} />
    </div>
  )
}

export default ConfigPanel