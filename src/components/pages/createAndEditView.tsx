import { useState } from 'react';
import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import { createUseStyles } from 'react-jss';
import { Props } from '../config/types';
import { buttonTexts, labels, paths } from '../config/textReferences';
import Toastr from 'toastr';

export default function CreateAndEditView(props: Props) {
	const data = props.location.state;
	const [ newNote, setNewNote ] = useState({ index: 0, title: '', content: '', date: '' });

	function SaveData() {
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
			Toastr.success('Note saved!');
			props.history.push(paths.pathToHomeView);
		} else {
			//toastr + make input and textarea compulsory
		}
	}

	return (
		<div>
			<div className={styles().blockStyle}>
				<PageTitle label={(data && data.title) || labels.secondViewTitle} style={styles().pageTitleStyle} />
			</div>
			<form className={styles().fieldsWrapper} onSubmit={() => SaveData()}>
				<input
					name="title"
					type="text"
					className={styles().titleInput}
					defaultValue={(data && data.title) || null}
					placeholder={!data ? labels.titleFieldLabel : ''}
					onChange={(e) => setNewNote((note) => ({ ...note, title: e.target.value }))}
					readOnly={false}
				/>
				<textarea
					name="content"
					className={styles().textArea}
					defaultValue={(data && data.content) || null}
					placeholder={!data ? labels.textFieldLabel : ''}
					onChange={(e) => setNewNote((note) => ({ ...note, content: e.target.value }))}
					readOnly={false}
				/>
				<div className={styles().buttonEditWrapper}>
					<Button
						style={styles().buttonCancel}
						label={buttonTexts.cancelBtn}
						path={paths.pathToHomeView}
						history={props.history}
					/>
					<Button
						style={styles().buttonSave}
						label={buttonTexts.saveBtn}
						path=""
						type="submit"
						history={props.history}
					/>
				</div>
			</form>
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
