import React, {useState} from 'react';
import Articles from '../components/articles';
import Layout from '../components/layout';
import Seo from '../components/seo';
import { fetchAPI } from '../lib/api';
import Slider from '../components/Slider';
import dynamic from 'next/dynamic';
const CEditor = dynamic(() => import('../components/CKeditor'), {
	ssr: false,
});
import style from './style.module.scss'
import SliderComponent from '../components/SlideComponent'
import News from '../components/LastNews'

const Home = ({ articles, categories, homepage, data }) => {
	console.log(homepage.attributes)
	const [editorLoaded, setEditorLoaded] = useState(false);
	return (
	<div className={`container-fluid p-0 ${style.backGroundIndex}`}>
		<Layout categories={categories}>
			<Seo seo={homepage.attributes.seo} />
			{/* <Slider /> */}
			<div className="container p-0">
				<h3>Ultimas postagens</h3>
				<hr />
				<News articles={articles} />
			</div>
			<div className="container-fluid p-0">
	
				<div className={style.backDev}>
					<p ><CEditor className={style.backCeditorAbout} setData={data} htmlData={homepage.attributes.dev.description}/></p>
				</div>
				
			</div>
			<div className="container-fluid">
				<br />
				<h3>Pesquisas</h3>
				<hr />
				<div className="container">
					
					<Articles articles={articles} />
				</div>
			</div>
			<div className={style.backDev}>
				<br />
				
				<h3>Autismo e Tratamentos</h3>
				<hr />
				<div className="container">
		
					<Articles articles={articles} />
				</div>
			</div>

			<SliderComponent articles={articles} homepage={homepage}/>
		</Layout>
	</div>
	);
};

export async function getStaticProps({ session }) {
	// Run API calls in parallel

	const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
		fetchAPI('/articles', { populate: ['image', 'category'] }),
		fetchAPI('/categories', { populate: '*' }),
		fetchAPI('/homepage', {
			populate: {
				hero: '*',
				seo: { populate: '*' },
				dev:{populate:'*'}
			},
		}),
	]);

	return {
		props: {
			articles: articlesRes.data,
			categories: categoriesRes.data,
			homepage: homepageRes.data,
		},
		revalidate: 1,
	};
}

export default Home;
