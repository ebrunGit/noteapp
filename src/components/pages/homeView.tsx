import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import Link from '../uikit/link';
import { buttonTexts, labels, paths } from '../config/textReferences';
import Store from 'store';
import { createUseStyles } from 'react-jss';
import { noteDataType, Props } from '../config/types';
import { useState } from 'react';
import moment from 'moment';

export default function HomeView(props: Props) {
	const [ data, setData ] = useState<noteDataType[]>(setDataFromCache());
	const styles = useStyles();

	function setDataFromCache() {
		let tmp: noteDataType[] = [];
		if (localStorage.length > 0) {
			for (let i = 0; i < localStorage.length / 3; i++) {
				tmp.push({ index: 0, title: '', content: '', date: '' });
			}
		}

		Store.each((value, key) => {
			if (key.includes('title')) {
				tmp[parseInt(key.charAt(key.length - 1))].title = value;
				tmp[parseInt(key.charAt(key.length - 1))].index = parseInt(key.charAt(key.length - 1));
			} else if (key.includes('content')) tmp[parseInt(key.charAt(key.length - 1))].content = value;
			else if (key.includes('date')) tmp[parseInt(key.charAt(key.length - 1))].date = value;
		});
		SortByMostRecent(tmp);
		return tmp;
	}

	function SortByMostRecent(data: noteDataType[]) {
		data.sort((a, b) => {
			// transform strings of date and time into moment type data for comparison
			let timeA = moment(a.date.split(' ')[2], [ 'hh:mmA' ]).format('HH:mm');
			let dateA = moment(a.date.split(' ')[0]).format('MM/DD/YYYY');
			let dtA = moment(dateA + ' ' + timeA);
			let timeB = moment(b.date.split(' ')[2], [ 'hh:mmA' ]).format('HH:mm');
			let dateB = moment(b.date.split(' ')[0]).format('MM/DD/YYYY');
			let dtB = moment(dateB + ' ' + timeB);

			if (dtA.diff(dtB) < 0) return 1;
			else if (dtA.diff(dtB) > 0) return -1;
			else return 0;
		});
	}

	function DeleteData(i: number) {
		localStorage.removeItem('title' + i);
		localStorage.removeItem('content' + i);
		localStorage.removeItem('date' + i);
		ResetIndexes(i);
		setData(() => setDataFromCache());
	}

	function ResetIndexes(i: number) {
		let arr: string[][] = [];
		Store.each((value, key) => arr.push([ key, value ]));
		Store.clearAll();
		for (let [ key, value ] of arr) {
			if (parseInt(key.charAt(key.length - 1)) > i) {
				let str = key.split('');
				let previousIndex = parseInt(str.splice(key.length - 1, 1)[0]);
				let newKey = str.join().replaceAll(',', '');
				key = newKey + (previousIndex - 1).toString();
			}
			Store.set(key, value);
		}
	}

	return (
		<div>
			<div className={styles.blockStyle}>
				<PageTitle label={labels.firstViewTitle} style={styles.pageTitleStyle} />
				<Button
					type="button"
					style={styles.buttonCreate}
					label={buttonTexts.createBtn}
					onClick={() => props.history.push(paths.pathToCreateView)}
				/>
			</div>
			<div className={styles.linksBlock}>
				{data.length > 0 ? (
					data.map((set: noteDataType, i: number) => (
						<div key={i} style={{ paddingBottom: '10px' }}>
							<Link path={paths.pathToReadView} data={set} style={styles.links} />
							<Button
								type="button"
								style={styles.buttonEdit}
								label={buttonTexts.editBtn}
								onClick={() => props.history.push(paths.pathToEditView, set)}
							/>
							<Button
								type="delete"
								style={styles.buttonDelete}
								label={buttonTexts.deleteBtn}
								onDelete={() => DeleteData(set.index)}
							/>
						</div>
					))
				) : (
					<span>{labels.noNotes}</span>
				)}
			</div>
		</div>
	);
}

const useStyles = createUseStyles({
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
		width: 'fit-content',
		padding: '0 20px'
	},
	links: {
		textDecoration: 'none',
		color: '#000',
		'&:hover': {
			color: '#007704'
		}
	}
});
