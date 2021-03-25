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
		history.push(path, data && data);
	}

	function GotToDelete() {
		console.log('DELETE');
	}

	return (
		<button className={style} onClick={path ? GoToPath : GotToDelete}>
			{label}
		</button>
	);
}
