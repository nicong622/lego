import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { useRef } from 'react';

export interface DragItem {
	name: string;
	id: string;
	index: number;
}

interface PropsType extends DragItem {
	moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Dragable: React.FC<PropsType> = (props) => {
	const ref = useRef<HTMLDivElement>(null);
	const [{ handlerId }, drop] = useDrop({
		accept: 'dragable',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor: DropTargetMonitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = props.index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();

			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();

			// Get pixels to the top
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// Time to actually perform the action
			props.moveCard(dragIndex, hoverIndex);

			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: 'dragable',
		item: () => {
			return { id: props.id, index: props.index };
		},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const opacity = isDragging ? 0 : 1;
	drag(drop(ref));

	return (
		<div
			ref={ref}
			style={{ opacity }}
			className='dragable'
			data-handler-id={handlerId}
		>
			{props.children}
		</div>
	);
}

export default Dragable;