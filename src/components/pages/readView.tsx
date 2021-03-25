import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import { createUseStyles } from 'react-jss';
import { Props } from '../config/types';
import { buttonTexts, paths } from '../config/textReferences';

export default function ReadView(props: Props) {
	const data = props.location.state;
	return (
		<div>
			<div className={styles().blockStyle}>
				<PageTitle label={data.title} style={styles().pageTitleStyle} />
			</div>
			<div className={styles().linksBlock}>{data.content}</div>
			<div className={styles().buttonEditWrapper}>
				<Button
					style={styles().buttonEdit}
					label={buttonTexts.editBtn}
					path={paths.pathToEditView}
					data={data}
				/>
				<Button style={styles().buttonEdit} label={buttonTexts.homeBtn} path={paths.pathToHomeView} />
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
	linksBlock: {
		margin: '100px auto 0 auto',
		width: 'fit-content',
		padding: '0 20px'
	},
	buttonEdit: {
		backgroundColor: '#2c86b7',
		marginRight: '10px'
	},
	buttonEditWrapper: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: '50px'
	}
});
