import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import { createUseStyles } from 'react-jss';
import { Props } from '../config/types';
import { buttonTexts, labels, paths } from '../config/textReferences';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

export default function CreateAndEditView(props: Props) {
	const history = useHistory();
	const data = props.location.state;
	const [ newNote, setNewNote ] = useState({ index: 0, title: '', content: '', date: '' });

	function UpdateData(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
		const { name, value } = { name: event.target.name, value: event.target.value };
		name === 'title'
			? setNewNote((note) => ({ ...note, title: value }))
			: setNewNote((note) => ({ ...note, content: value }));
	}

	function saveData() {
		if (newNote.title && newNote.content) {
			if (data) {
				const currentIndex = data.index;
				localStorage.setItem('title' + currentIndex, newNote.title);
				localStorage.setItem('content' + currentIndex, newNote.content);
				localStorage.setItem('date' + currentIndex, newNote.date);
			} else {
				const storageIndex = localStorage.length / 3;
				localStorage.setItem('title' + storageIndex, newNote.title);
				localStorage.setItem('content' + storageIndex, newNote.content);
				localStorage.setItem('date' + storageIndex, newNote.date);
			}
			history.push(paths.pathToHomeView);
		} else {
		}
	}

	return (
		<div>
			<div className={styles().blockStyle}>
				<PageTitle label={(data && data.title) || labels.secondViewTitle} style={styles().pageTitleStyle} />
			</div>
			<form className={styles().fieldsWrapper} onSubmit={saveData}>
				<input
					name="title"
					type="text"
					className={styles().titleInput}
					defaultValue={(data && data.title) || null}
					placeholder={!data ? labels.titleFieldLabel : ''}
					onChange={(e) => UpdateData(e)}
					readOnly={false}
				/>
				<textarea
					name="content"
					className={styles().textArea}
					defaultValue={(data && data.content) || null}
					placeholder={!data ? labels.textFieldLabel : ''}
					onChange={(e) => UpdateData(e)}
					readOnly={false}
				/>
			</form>
			<div className={styles().buttonEditWrapper}>
				<Button style={styles().buttonCancel} label={buttonTexts.cancelBtn} path={paths.pathToHomeView} />
				<Button style={styles().buttonSave} label={buttonTexts.saveBtn} path="" />
			</div>
		</div>
	);
}

const styles = createUseStyles({
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
