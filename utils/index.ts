import dynamic from 'next/dynamic';

export function dynamicImport(name: string) {
	return dynamic(() => import(`@components/stage/${name}`).catch(console.error))
}

export function uniqueId(): string {
  return (Math.random() * 100000000).toFixed(0)
}
