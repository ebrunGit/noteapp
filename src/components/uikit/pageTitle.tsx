import { defaultStyleObject } from '../config/types';

export default function PageTitle({ style, label }: { style?: defaultStyleObject; label: string }) {
	return <span style={style}>{label}</span>;
}
