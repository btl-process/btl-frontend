export type Case = {
    id: string;
    involved: string;
    date: Date;
    amount: number;
    status: 'on-time' | 'expire' | 'overdue';
    createdAt: Date;
    updatedAt: Date;
}