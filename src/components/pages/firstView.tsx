import Button from '../uikit/button';
import PageTitle from '../uikit/pageTitle';
import { buttonTexts, labels } from '../config/texts';

export default function FirstView() {
	return (
		<div style={styles.blocStyle}>
			<div>
				<PageTitle label={labels.firstViewTitle} />
			</div>
			<div>
				<Button style={styles.buttonCreate} label={buttonTexts.createBtn} />
			</div>
		</div>
	);
}

const styles = {
	buttonCreate: {
		backgroundColor: '#008839'
	},
	blocStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end'
	}
};
