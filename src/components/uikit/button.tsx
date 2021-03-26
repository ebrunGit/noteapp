export default function Button({
	style,
	label,
	type,
	onDelete,
	onClick
}: {
	style: string;
	label: string;
	type: string;
	onDelete?: () => void;
	onClick?: () => void;
}) {
	switch (type) {
		case 'save':
			return (
				<button className={style} type="submit" onClick={onClick}>
					{label}
				</button>
			);

		case 'delete':
			return (
				<button className={style} onClick={onDelete}>
					{label}
				</button>
			);

		default:
			return (
				<button className={style} onClick={onClick}>
					{label}
				</button>
			);
	}
}
