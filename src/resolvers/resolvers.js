import { randomUUID } from 'node:crypto';
import { users } from '../data/users.js';

export const resolvers = {
    Query: {
        users: () => { return users; }
    },

    Mutation: {
        addUser: (_, { name, email }) => {
            const newUser = {
                id: randomUUID(),
                name,
                email
            };

            users.push(newUser);
            return newUser;
        }
    }
};