export default function Button({ style, label }: { style: string; label: string }) {
	return <button className={style}>{label}</button>;
}
