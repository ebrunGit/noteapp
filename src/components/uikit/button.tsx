import { noteDataType } from '../config/types';
import { History } from 'history';

export default function Button({
	style,
	label,
	path,
	data,
	type,
	history,
	onDelete
}: {
	style: string;
	label: string;
	path: string;
	history: History;
	data?: noteDataType;
	type?: 'button' | 'submit' | 'reset' | undefined;
	onDelete?: () => void;
}) {
	function GoToPath() {
		history.push(path, data);
	}

	return type ? (
		<button className={style} type={type}>
			{label}
		</button>
	) : (
		<button className={style} onClick={path ? GoToPath : onDelete}>
			{label}
		</button>
	);
}
