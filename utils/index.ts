import dynamic from 'next/dynamic';

export function dynamicImport<T>(name: string) {
	return dynamic<T>(() =>
		import(`bricks/${name}`).catch((err) => {
			console.warn('[lego error][at dynamicImport] ', err);
			return null;
		})
	);
}

export function uniqueId(): string {
	return (Math.random() * 100000000).toFixed(0);
}
