import { randomUUID } from 'node:crypto'

export let users = [
    {
        id: randomUUID(),
        name: 'Pera Perovic',
        email: 'pera@example.com'
    },
    {
        id: randomUUID(),
        name: 'Marko Markovic',
        email: 'marko@example.com'
    }
];