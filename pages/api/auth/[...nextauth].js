import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: 'Credentials',

			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'email@email.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			authorize: (credentials) => {
				if (
					credentials.username === 'andre@email.com' &&
					credentials.password === '123456'
				) {
					return {
						id: 1,
						name: 'Andre',
						email: 'andre@email.com',
						place: 'São Paulo',
					};
				}
				return null;
			},
			callbacks: {
				async session({ session, token, user }) {
					try {
						return {
							...session,
							id: 1,
							local: 'São Paulo',
						};
					} catch {
						return {
							...session,
							id: null,
						};
					}
				},
				async signIn({ user, account, profile }) {
					const { email } = user;
					try {
						return true;
					} catch (err) {
						console.log('DEU ERRO: ', err);
						return false;
					}
				},
			},
		}),
	],
};
export default NextAuth(authOptions);
