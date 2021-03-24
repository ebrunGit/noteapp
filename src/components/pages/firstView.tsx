import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import Link from '../uikit/link';
import { buttonTexts, labels } from '../config/texts';
import { useEffect } from 'react';
import Store from 'store';

export default function FirstView() {
	let data: { title: string; content: string; date: string }[] = [];

	useEffect(() => {
		Store.each((key, value) => {
			if (key.includes('title')) data[parseInt(key.charAt(key.length))].title = value;
			else if (key.includes('content')) data[parseInt(key.charAt(key.length))].content = value;
			else if (key.includes('date')) data[parseInt(key.charAt(key.length))].date = value;
		});
	}, []);

	return (
		<div>
			<div style={styles.blockStyle}>
				<PageTitle label={labels.firstViewTitle} style={styles.pageTitleStyle} />
				<Button style={styles.buttonCreate} label={buttonTexts.createBtn} />
			</div>
			<div style={styles.linksBlock}>
				{data.length > 0 ? (
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
		position: 'absolute' as 'absolute', // workaround for a typescript behaviour working...
		top: 0,
		right: 0,
		'&:hover': {
			backgroundColor: 'black'
		}
	},
	blockStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative' as 'relative' // workaround for a typescript behaviour working...
	},
	pageTitleStyle: {
		marginTop: 10
	},
	linksBlock: {
		marginTop: '100px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
};
