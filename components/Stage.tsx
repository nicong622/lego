import { useState, useCallback, ComponentType, HTMLAttributes } from 'react';
import { useDrop } from 'react-dnd';
import classnames from 'classnames';
import { dynamicImport } from '@utils';
import update from 'immutability-helper';
import Dragable from './Dragable';
import ConfigWrapper from './ConfigWrapper';
import StateWrapper from './StateWrapper';
import { uniqueId } from '@utils';
import globalState, { useGlobalState } from 'store';

import type { DragItem } from './GalleryItem';

interface ChildType {
	name: string;
	id: string;
	el: ComponentType;
}

const Stage: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
	const [children, setChildren] = useState<ChildType[]>([]);
  const state = useGlobalState(globalState)

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
						el: Comp,
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
			const { name, id, el: El } = item;

			return (
				<Dragable
					key={id}
					index={index}
					moveCard={moveCard}
					name={name}
					id={id}
				>
					<ConfigWrapper name={name} id={id}>
            <StateWrapper state={state.compProps.nested(id)}>
              <El />
            </StateWrapper>
          </ConfigWrapper>
				</Dragable>
			);
		});
	}

	return (
		<div
			ref={drop}
			className={classnames('stage w-375px h-667px border', props.className)}
		>
			{renderChildren(children)}
		</div>
	);
};

export default Stage;
