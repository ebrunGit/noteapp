import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import Link from '../uikit/link';
import { buttonTexts, labels } from '../config/texts';
import Store from 'store';
import { createUseStyles } from 'react-jss';
import moment from 'moment';

export default function FirstView() {
	const data: { title: string; content: string; date: string }[] = setDataFromCache();

	function setDataFromCache() {
		let tmp: { title: string; content: string; date: string }[] = [];
		if (localStorage.length > 0) {
			for (let i = 0; i < localStorage.length / 3; i++) {
				tmp.push({ title: '', content: '', date: '' });
			}
		}
		Store.each((value, key) => {
			if (key.includes('title')) tmp[parseInt(key.charAt(key.length - 1))].title = value;
			else if (key.includes('date')) tmp[parseInt(key.charAt(key.length - 1))].date = value;
		});
		return tmp;
	}

	console.log('data', data);
	return (
		<div>
			<div className={styles().blockStyle}>
				<PageTitle label={labels.firstViewTitle} style={styles().pageTitleStyle} />
				<Button style={styles().buttonCreate} label={buttonTexts.createBtn} />
			</div>
			<div className={styles().linksBlock}>
				{data.length > 0 ? (
					data.map((set: { title: string; date: string }, i: number) => (
						<div key={i} style={{ paddingBottom: '10px' }}>
							<Link title={set.title} date={set.date} />
							<Button style={styles().buttonEdit} label={buttonTexts.editBtn} />
							<Button style={styles().buttonDelete} label={buttonTexts.deleteBtn} />
						</div>
					))
				) : (
					<span>{labels.noNotes}</span>
				)}
			</div>
		</div>
	);
}

const styles = createUseStyles({
	buttonCreate: {
		backgroundColor: '#008839',
		position: 'absolute',
		top: 0,
		right: 0
	},
	buttonEdit: {
		backgroundColor: '#2c86b7',
		marginLeft: '10px'
	},
	buttonDelete: {
		backgroundColor: '#890d09',
		marginLeft: '10px'
	},
	blockStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	pageTitleStyle: {
		marginTop: 10
	},
	linksBlock: {
		margin: '100px auto 0 auto',
		width: 'fit-content'
	}
});
