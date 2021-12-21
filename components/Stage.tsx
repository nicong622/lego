import { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import dynamic from 'next/dynamic';
import update from 'immutability-helper';
import Dragable from './Dragable';
import { uniqueId } from '@utils';

import type { DragItem } from './GalleryItem';

interface ChildType {
	name: string;
	id: string;
	el: JSX.Element;
}

const basePath = './stage/';

function dynamicImport(name: string) {
	return dynamic(() => import(`${basePath}${name}`));
}

const Stage: React.FC = () => {
	const [children, setChildren] = useState<ChildType[]>([]);

	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const dragCard = children[dragIndex];
			setChildren(
				update(children, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragCard],
					],
				})
			);
		},
		[children]
	);

	const [{ result }, drop] = useDrop(
		() => ({
			accept: 'box',
			drop: (item, monitor) => {
				const dragItem = monitor.getItem<DragItem>();
				const Comp = dynamicImport(dragItem.name);

				setChildren([
					...children,
					{
						name: dragItem.name,
						id: `${dragItem.name}_${uniqueId()}`,
						el: <Comp />,
					},
				]);
			},
			collect: (monitor) => ({
				result: monitor.getDropResult(),
			}),
		}),
		[children]
	);

	function renderChildren(components: ChildType[]): JSX.Element[] {
		return components.map((item, index) => {
			const { name, id, el } = item;

			return (
				<Dragable
					key={id}
					index={index}
					moveCard={moveCard}
					name={name}
					id={id}
				>
          {el}
				</Dragable>
			);
		});
	}

	return (
		<div
			role={'Dustbin'}
			ref={drop}
			className='stage w-375px h-667px border mr-4'
		>
			{renderChildren(children)}
		</div>
	);
};

export default Stage;
