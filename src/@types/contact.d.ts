export interface IContact {
    id: number;
    name: string; 
    number: string;
    idFriend?: number;
    checked?: boolean;
}