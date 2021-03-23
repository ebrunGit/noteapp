import { buttonStyleObject } from '../config/types';

export default function Button({ style, label }: { style: buttonStyleObject; label: string }) {
	return <button style={style}>{label}</button>;
}
