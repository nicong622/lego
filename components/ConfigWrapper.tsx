import { useEffect } from 'react';
import globalState, { useGlobalState } from 'store';

interface PropsType {
	name: string;
	id: string;
}

const ConfigWrapper: React.FC<PropsType> = (props) => {
	const state = useGlobalState(globalState);

	function setFocusing() {
		const { id } = props;

		state.focusing.set(id)
		state.compProps.merge(p => ({	[id]: p[id] }));
	}

	// 加载默认状态
	useEffect(() => {
		let defaultData = {}

		try {
			defaultData = require(`/bricks/${props.name}/default.json`)
		} catch (error) {
			console.warn('[lego error][at ConfigWrapper] ', error);
		}

		state.compProps.merge({ [props.id]: defaultData })
	}, [props.id, props.name])

	return (
		<div className='relative'>
			{ props.children }

			<button className='absolute bottom-0 right-0' onClick={setFocusing}>
				配置
			</button>
		</div>
	);
};

export default ConfigWrapper;
