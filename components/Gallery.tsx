import GalleryItem from './GalleryItem';

function importAll(r): string[] {
	return r.keys();
}

const galleryList = importAll(require.context('./stage/', true, /\.tsx$/))
	.map((filename) => /\.\/(\w+)\.tsx/.exec(filename)?.[1])
	.filter(Boolean)
	.map((name) => ({ name: name as string }));

const Gallery: React.FC = () => {
	return (
		<div className='gallery'>
			{galleryList.map((item) => (
				<GalleryItem name={item.name} id={item.name} key={item.name} />
			))}
		</div>
	);
};

export default Gallery;
