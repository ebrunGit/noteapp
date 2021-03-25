import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import Link from '../uikit/link';
import { buttonTexts, labels, paths } from '../config/textReferences';
import Store from 'store';
import { createUseStyles } from 'react-jss';
import { noteDataType, Props } from '../config/types';
import { useEffect, useState } from 'react';

export default function HomeView(props: Props) {
	const [ data, setData ] = useState(setDataFromCache());

	useEffect(() => {
		window.onstorage = () => {
			console.log('in storage listener');
			//setData(() => setDataFromCache());
		};
		return () => {
			window.removeEventListener('storage', () => setData(() => setDataFromCache()));
		};
	}, []);

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
		return tmp;
	}

	function DeleteData(i: number) {
		localStorage.removeItem('title' + i);
		localStorage.removeItem('content' + i);
		localStorage.removeItem('date' + i);
	}

	return (
		<div>
			<div className={styles().blockStyle}>
				<PageTitle label={labels.firstViewTitle} style={styles().pageTitleStyle} />
				<Button
					style={styles().buttonCreate}
					label={buttonTexts.createBtn}
					path={paths.pathToCreateView}
					history={props.history}
				/>
			</div>
			<div className={styles().linksBlock}>
				{data.length > 0 ? (
					data.map((set: noteDataType, i: number) => (
						<div key={i} style={{ paddingBottom: '10px' }}>
							{/* du plus recent au plus ancien */}
							<Link path={paths.pathToReadView} data={set} />
							<Button
								style={styles().buttonEdit}
								label={buttonTexts.editBtn}
								path={paths.pathToEditView}
								data={set}
								history={props.history}
							/>
							<Button
								style={styles().buttonDelete}
								label={buttonTexts.deleteBtn}
								path=""
								data={set}
								onDelete={() => DeleteData(set.index)}
								history={props.history}
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
		width: 'fit-content',
		padding: '0 20px'
	}
});
