import React from 'react';
import { useState } from 'react';
import type { TestProps } from './index';

export interface ConfigProps {
  value: TestProps
  onChange: (params: TestProps) => void
}

export default function TestConfig(props: ConfigProps) {
	const [color, onChange] = useState(props.value.color);

	function onConfirm() {
    props.onChange({ color })
	}

	return (
		<div className='setting'>
			<label htmlFor='test'>字体颜色</label>
			<input
				id='test'
				type='text'
        className='border'
				value={color}
				onChange={(e) => onChange(e.currentTarget.value)}
			/>
			<button onClick={onConfirm}>确认</button>
		</div>
	);
}
