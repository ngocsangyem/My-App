export interface TodoInterface {
	id: number;
	name: string;
	state: TodoState;
}


export enum TodoState {
	Active = 0,
	Complete = 1
}
