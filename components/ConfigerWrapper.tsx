import globalState, { useGlobalState } from 'store';

interface PropsType {
	name: string;
	id: string;
}

const ConfigerWrapper: React.FC<PropsType> = (props) => {
	const state = useGlobalState(globalState);

	function setFocusing() {
		const { id } = props;

		state.set({
			focusing: id,
			[id]: {},
		});
	}

	return (
		<div className='relative'>
			{props.children}

			<button className='absolute bottom-0 right-0' onClick={setFocusing}>
				配置
			</button>
		</div>
	);
};

export default ConfigerWrapper;
