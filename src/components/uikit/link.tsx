import { defaultStyleObject } from '../config/types';
import { labels } from '../config/texts';

export default function Link({ style, title, date }: { style?: defaultStyleObject; title: string; date: string }) {
	return (
		<link style={style}>
			{title}
			<span style={{ fontStyle: 'italic' }}>{labels.linkDefaultText}</span>
			{date}
		</link>
	);
}
