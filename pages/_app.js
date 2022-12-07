import App from 'next/app';
import Head from 'next/head';
import '../assets/css/style.css';
import { createContext } from 'react';
import { fetchAPI } from '../lib/api';
import { getStrapiMedia } from '../lib/media';
import '../styles/content-styles.css';
import '../src/styles/global.scss';
import { SessionProvider } from 'next-auth/react';
// add bootstrap css
// own css files here
import { useEffect } from 'react';
import '../src/styles/style.scss';
import '../styles/globals.css';
import '../fonts/icomoon/style.css';
import '../css/owl.carousel.min.css';
import '../css/bootstrap.min.css';

// Store Strapi Global object in context
export const GlobalContext = createContext({});

import '../styles/applications.scss';
const MyApp = ({ Component, pageProps, session }) => {
	const { global } = pageProps;

	return (
		<>
			<SessionProvider session={session}>
				<Head>
					<link
						rel="shortcut icon"
						href={getStrapiMedia(global.attributes.favicon)}
					/>
				</Head>

				<GlobalContext.Provider value={global.attributes}>
					<Component {...pageProps} />
				</GlobalContext.Provider>
			</SessionProvider>
		</>
	);
};

MyApp.getInitialProps = async (ctx) => {
	// Calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(ctx);
	// Fetch global site settings from Strapi
	const globalRes = await fetchAPI('/global', {
		populate: {
			favicon: '*',
			defaultSeo: {
				populate: '*',
			},
		},
	});
	// Pass the data to our page via props
	return {
		...appProps,
		pageProps: { global: globalRes.data },
	};
};

export default MyApp;
