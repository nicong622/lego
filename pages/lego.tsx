import React from 'react';
import Gallery from '../components/Gallery';
import Stage from '../components/Stage';
import ConfigPanel from '@components/ConfigPanel';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Lego() {
	return (
		<div className='flex'>
			<DndProvider backend={HTML5Backend}>
				<Stage className="mr-4" />
				<Gallery className="mr-4" />
        <ConfigPanel className="mr-4" />
			</DndProvider>
		</div>
	);
}
