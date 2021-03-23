import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import Link from '../uikit/link';
import { buttonTexts, labels } from '../config/texts';
import { useEffect, useState } from 'react';

export default function FirstView() {
	const [ data, setData ] = useState([]);
	useEffect(() => {}, []);

	return (
		<div>
			<div style={styles.blocStyle}>
				<PageTitle label={labels.firstViewTitle} style={styles.pageTitleStyle} />
				<Button style={styles.buttonCreate} label={buttonTexts.createBtn} />
			</div>
			<div>
				{data ? (
					data.map((set: { title: string; date: string }) => <Link title={set.title} date={set.date} />)
				) : (
					<span>{labels.noNotes}</span>
				)}
			</div>
		</div>
	);
}

const styles = {
	buttonCreate: {
		backgroundColor: '#008839',
		marginLeft: 'auto'
	},
	blocStyle: {
		display: 'flex',
		alignItems: 'center'
	},
	pageTitleStyle: {
		marginLeft: 'auto'
	}
};
