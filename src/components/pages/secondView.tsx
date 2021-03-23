import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import { buttonTexts, labels } from '../config/texts';

export default function FirstView() {
    
	return (
        <>
		<div style={styles.blocStyle}>
			<PageTitle label={labels.firstViewTitle} style={styles.pageTitleStyle} />
			<Button style={styles.buttonCreate} label={buttonTexts.createBtn} />
		</div>
        <span>{labels.noNotes}</span>
        {}
        </>
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
