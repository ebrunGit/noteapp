import { labels } from '../config/textReferences';
import { Link } from 'react-router-dom';
import { noteDataType } from '../config/types';

export default function LinkUi({ style, data, path }: { data: noteDataType; path: string; style?: string }) {
	return (
		<Link to={{ pathname: path, state: data }} className={style}>
			{data.title}
			<i>
				{labels.linkDefaultText}
				{data.date}
			</i>
		</Link>
	);
}
