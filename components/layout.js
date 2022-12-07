import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children, categories, seo }) => (
	<>
		<Nav categories={categories} />

		<div className="container-fluid p-0"> {children}</div>
		<Footer />
	</>
);

export default Layout;
