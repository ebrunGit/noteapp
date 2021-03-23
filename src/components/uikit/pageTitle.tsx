import { pageTitleStyleObject } from '../config/types';

export default function PageTitle({ style, label }: { style?: pageTitleStyleObject; label: string }) {
	return <span>{label}</span>;
}
