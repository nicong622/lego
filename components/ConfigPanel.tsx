import globalState, { useGlobalState } from 'store';
import type { ConfigProps } from '@types';
import { HTMLAttributes } from 'react';
import dynamic from 'next/dynamic';

const ConfigPanel: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
	const state = useGlobalState(globalState);
	const defaultState = state.compProps.nested(state.focusing.get());

	const compName = state.get().focusing.split('_')[0];
	const ConfigForm = compName
		? dynamic<ConfigProps<object>>(() =>
				import(`bricks/${compName}`).then((mod) => mod.Config)
		  )
		: 'div';

	function onChange(value: object) {
		defaultState.set(value);
	}

	return (
		<div className={props.className}>
			<p>focusing on {state.get().focusing}</p>

			<ConfigForm onChange={onChange} value={defaultState.get()} />
		</div>
	);
};

export default ConfigPanel;
