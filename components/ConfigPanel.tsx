import {useState} from 'react';
import globalState, { useGlobalState } from 'store';
import { dynamicImport } from '@utils';

interface PropsType {}

const ConfigPanel: React.FC<PropsType> = () => {
  const state = useGlobalState(globalState)
  const compName = state.get().focusing.split('_')[0]
  const ConfigForm = dynamicImport(`${compName}/config.tsx`)
  const [initialValue, setState] = useState({ color: 'black' })

  function onChange(value: unknown) {
    const focusing = state.get().focusing

    setState(value)
    state.set({
      ...state.get(),
      [focusing]: value
    })
  }

  return (
    <div>
      <p>focusing on {state.get().focusing}</p>

      <ConfigForm value={initialValue} onChange={onChange} />
    </div>
  )
}

export default ConfigPanel