import { useDrag } from 'react-dnd';

export interface DragItem {
	name: string
	id: string
}

interface PropsType extends DragItem {
}

const GalleryItem: React.FC<PropsType> = (props) => {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'box',
		item: { name: props.name, id: props.id },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}));

	return (
		<div ref={drag} key={props.id} className='w-80px h-40px border border-dashed rounded text-center p-1 m-1'>
			{props.name}
		</div>
	);
};

export default GalleryItem;
