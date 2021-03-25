import { History } from 'history';

export interface noteDataType {
	title: string;
	content: string;
	date: string;
	index: number;
}

export interface Props {
	location: any;
	history: History;
}
