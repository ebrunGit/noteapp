import { labels } from '../config/texts';

export default function Link({ style, title, date }: { style?: string; title: string; date: string }) {
	return (
		<a href="" className={style}>
			<i>
				{title}
				{labels.linkDefaultText}
				{date}
			</i>
		</a>
	);
}
