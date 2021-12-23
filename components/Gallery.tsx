import GalleryItem from './GalleryItem';
import classnames from 'classnames';
import { HTMLAttributes } from 'react';

const galleryList = require.context('/bricks/', true, /\.\/(\w+)(\/\w+)*\.tsx$/)
	.keys()
	.map((filename) => /\.\/(\w+)(\/index)*\.tsx$/.exec(filename)?.[1])
	.filter(Boolean)
	.map((name) => ({ name: name as string }));

const Gallery: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
	return (
		<div className={classnames('gallery', props.className)}>
			{galleryList.map((item) => (
				<GalleryItem name={item.name} id={item.name} key={item.name} />
			))}
		</div>
	);
};

export default Gallery;
