import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import { createUseStyles } from 'react-jss';
import { Props } from '../config/types';
import { buttonTexts, labels, paths } from '../config/textReferences';
import React, { useState } from 'react';

export default function CreateAndEditView(props: Props) {
	const data = props.location.state;
	const [ isEdited, setIsEdited ] = useState(false);

	function UpdateData(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
		if (data) {
			const currentIndex = data.index;
			console.log(data, event.target.value);
			if (event.target.name === 'title') localStorage.setItem('title' + currentIndex, event.target.value);
			if (event.target.name === 'content') localStorage.setItem('content' + currentIndex, event.target.value);
		} else {
			const storageIndex = (localStorage.length - 1) / 3;
			if (event.target.name === 'title') localStorage.setItem('title' + storageIndex + 1, event.target.value);
			if (event.target.name === 'content') localStorage.setItem('content' + storageIndex + 1, event.target.value);
		}
		setIsEdited(true);
	}

	return (
		<div>
			<div className={styles().blockStyle}>
				<PageTitle label={(data && data.title) || labels.secondViewTitle} style={styles().pageTitleStyle} />
			</div>
			<div className={styles().fieldsWrapper}>
				<input
					name="title"
					type="text"
					className={styles().titleInput}
					defaultValue={(data && data.title) || labels.titleFieldLabel}
					onChange={(e) => UpdateData(e)}
					readOnly={false}
				/>
				<textarea
					name="content"
					className={styles().textArea}
					defaultValue={(data && data.content) || labels.textFieldLabel}
					onChange={(e) => UpdateData(e)}
					readOnly={false}
				/>
			</div>
			<div className={styles().buttonEditWrapper}>
				{isEdited && <span>{labels.editSaved}</span>}
				<Button style={styles().buttonEdit} label={buttonTexts.cancelBtn} path={paths.pathToHomeView} />
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
	buttonEdit: {
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
