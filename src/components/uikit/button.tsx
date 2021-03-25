import { useHistory } from 'react-router-dom';
import { noteDataType } from '../config/types';

export default function Button({
	style,
	label,
	path,
	data
}: {
	style: string;
	label: string;
	path: string;
	data?: noteDataType;
}) {
	const history = useHistory();
	function GoToPath() {
		history.push(path, data);
	}

	function GotToDelete() {
		const i = data?.index;
		localStorage.removeItem('title' + i);
		localStorage.removeItem('content' + i);
		localStorage.removeItem('date' + i);
	}

	return (
		<button className={style} onClick={path ? GoToPath : GotToDelete}>
			{label}
		</button>
	);
}
