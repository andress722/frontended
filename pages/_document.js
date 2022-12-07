import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* eslint-disable-next-line */}
					<link
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
						rel="stylesheet"
						integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
						crossorigin="anonymous"
					/>
					<link
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
						rel="stylesheet"
						integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
						crossorigin="anonymous"
					/>

					<link
						src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
						crossorigin
					/>

					<link
						src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
						crossorigin
					/>

					<link
						src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
						crossorigin
					/>
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
						integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
						crossorigin="anonymous"
					/>

					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Staatliches"
					/>
					<link
						rel="stylesheet"
						href="https://cdn.jsdelivr.net/npm/uikit@3.10.1/dist/css/uikit.min.css"
					/>
					<script
						async
						src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"
					/>

					<script
						async
						src="https://cdn.jsdelivr.net/npm/uikit@3.10.1/dist/js/uikit-icons.min.js"
					/>
					<script
						async
						src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
				<Script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
					crossorigin="anonymous"
				/>
			</Html>
		);
	}
}

export default MyDocument;
