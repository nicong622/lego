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
		state.compProps.merge(p => ({
			[id]: p[id] || { color: 'black' } // TODO 替换成组件的默认值
		}));
	}

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
