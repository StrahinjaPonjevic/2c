import { randomUUID } from 'node:crypto';
import { GraphQLError } from 'graphql';
import { users } from '../data/users.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const resolvers = {
    Query: {
        users: () => { return users; }
    },

    Mutation: {
        addUser: (_, { name, email }) => {

            if (!name.trim()) {
                throw new GraphQLError('Username ne sme biti prazan', {
                    extensions: { code: 'BAD_USER_INPUT' },
                });
            }

            if (!EMAIL_REGEX.test(email)) {
                throw new GraphQLError('Format emaila nije validan', {
                    extensions: { code: 'BAD_USER_INPUT' },
                });
            }

            const existingUser = users.find(
                (u) => u.email.toLowerCase() === email.toLowerCase()
            );

            if (existingUser) {
                throw new GraphQLError('Email adresa je zauzeta', {
                    extensions: { code: 'BAD_USER_INPUT' },
                });
            }

            const newUser = {
                id: randomUUID(),
                name: name.trim(),
                email: email.trim().toLowerCase(),
            };

            users.push(newUser);
            return newUser;
        },

        deleteUser: (_, { id }) => {
            const userIndex = users.findIndex((u) => u.id === id);

            if (userIndex === -1) {
                throw new GraphQLError('Korisnik sa datim id-jem nije pronadjen', {
                    extensions: { code: 'NOT_FOUND' },
                });
            }

            users.splice(userIndex, 1);
            return true;
        },
    }
};