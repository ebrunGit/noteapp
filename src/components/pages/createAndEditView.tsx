import { useState } from 'react';
import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import { createUseStyles } from 'react-jss';
import { Props } from '../config/types';
import { buttonTexts, labels, paths } from '../config/textReferences';
import { toastrCreationSuccess, toastrModifSuccess, toastrWarning } from '../config/toastrConfig';
import moment from 'moment';

export default function CreateAndEditView(props: Props) {
	const data = props.location.state;
	const styles = useStyles();
	const [ newNote, setNewNote ] = useState({
		index: (data && data.index) || 0,
		title: (data && data.title) || null,
		content: (data && data.content) || null,
		date: (data && data.date) || null
	});

	function SetDate() {
		return `${moment().format('MM/DD/YYYY')} at ${moment().format('h:mma')}`;
	}

	function SaveData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!data && newNote.title && newNote.content) {
			// Creation
			const storageIndex = localStorage.length / 3;
			localStorage.setItem('title' + storageIndex, newNote.title);
			localStorage.setItem('content' + storageIndex, newNote.content);
			localStorage.setItem('date' + storageIndex, SetDate());
			toastrCreationSuccess();
			props.history.push(paths.pathToHomeView);
		} else if (data && newNote.title && newNote.content) {
			// Update
			const currentIndex = data.index;
			localStorage.setItem('title' + currentIndex, newNote.title);
			localStorage.setItem('content' + currentIndex, newNote.content);
			localStorage.setItem('date' + currentIndex, SetDate());
			toastrModifSuccess();
			props.history.push(paths.pathToHomeView);
		} else toastrWarning();
	}

	return (
		<div>
			<div className={styles.blockStyle}>
				<PageTitle label={(data && data.title) || labels.secondViewTitle} style={styles.pageTitleStyle} />
			</div>
			<form className={styles.fieldsWrapper} onSubmit={(e) => SaveData(e)}>
				<input
					name="title"
					type="text"
					className={styles.titleInput}
					defaultValue={(data && data.title) || null}
					placeholder={!data ? labels.titleFieldLabel : ''}
					onChange={(e) =>
						setNewNote((note) => ({ ...note, title: e.target.value === '' ? null : e.target.value }))}
					readOnly={false}
				/>
				<textarea
					name="content"
					className={styles.textArea}
					defaultValue={(data && data.content) || null}
					placeholder={!data ? labels.textFieldLabel : ''}
					onChange={(e) =>
						setNewNote((note) => ({ ...note, content: e.target.value === '' ? null : e.target.value }))}
					readOnly={false}
				/>
				<div className={styles.buttonEditWrapper}>
					<Button
						type="button"
						style={styles.buttonCancel}
						label={buttonTexts.cancelBtn}
						onClick={() => props.history.push(paths.pathToHomeView, data)}
					/>
					<Button type="save" style={styles.buttonSave} label={buttonTexts.saveBtn} />
				</div>
			</form>
		</div>
	);
}

const useStyles = createUseStyles({
	blockStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	pageTitleStyle: {
		marginTop: 10
	},
	fieldsWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '20px auto 0 auto',
		width: '75%'
	},
	textArea: {
		padding: '10px',
		font: '100 16px Arial',
		width: '100%',
		height: '50vh',
		border: 'none',
		borderRadius: '10px'
	},
	titleInput: {
		padding: '10px',
		font: '100 16px Arial',
		border: 'none',
		borderRadius: '10px',
		marginBottom: '20px',
		width: '100%'
	},
	buttonCancel: {
		backgroundColor: '#2c86b7',
		marginRight: '10px'
	},
	buttonSave: {
		backgroundColor: '#008839'
	},
	buttonEditWrapper: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '50px'
	}
});
