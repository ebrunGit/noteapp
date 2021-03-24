export default function PageTitle({ style, label }: { style?: string; label: string }) {
	return <span className={style}>{label}</span>;
}
