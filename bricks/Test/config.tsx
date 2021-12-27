import React, { useState } from 'react';
import type { TestProps } from './App';

export interface ConfigProps<T extends object> {
  value: T
  onChange: (params: T) => void
}

export default function TestConfig(props: ConfigProps<TestProps>) {
	const [color, changeColor] = useState(props.value.color);
	const [text, changeText] = useState(props.value.text);

	function onConfirm() {
		props.onChange({ color, text });
	}

	return (
		<div className='setting'>
			<div className='mb-4'>
				<label htmlFor='color'>字体颜色</label>
				<input
					id='color'
					type='text'
					className='border'
					value={color}
					onChange={(e) => changeColor(e.currentTarget.value)}
				/>
			</div>

			<div className='mb-4'>
				<label htmlFor='text'>内容</label>
				<input
					id='text'
					type='text'
					className='border'
					value={text}
					onChange={(e) => changeText(e.currentTarget.value)}
				/>
			</div>

			<button className='border px-4 py-1 rounded' onClick={onConfirm}>
				确认
			</button>
		</div>
	);
}
