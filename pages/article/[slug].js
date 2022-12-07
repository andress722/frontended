import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import dynamic from 'next/dynamic';
const CEditor = dynamic(() => import('../../components/CKeditor'), {
	ssr: false,
});
import Seo from '../../components/seo';
import Layout from '../../components/layout';
import rehypeRaw from 'rehype-raw';
import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import Link from 'next/link';
import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from 'react-html-parser';

const Article = ({ article, categories, data }) => {
	const [editorLoaded, setEditorLoaded] = useState(false);

	useEffect(() => {
		setEditorLoaded(true);
	}, []);
	const imageUrl = getStrapiMedia(article.attributes.image);
	const markdown = {
		description: article.attributes.content,
	};
	const seo = {
		metaTitle: article.attributes.title,
		metaDescription: article.attributes.description,
		shareImage: article.attributes.image,
		article: true,
	};

	return (
		<Layout categories={categories.data}>
			<Seo seo={seo} />
			<div
				id="banner"
				className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
				data-src={imageUrl}
				data-srcset={imageUrl}
				data-uk-img
			>
				<h1>{article.attributes.title}</h1>
			</div>
			<div className="uk-section">
				<div className="uk-container uk-container-small">
					<div>
						<CEditor setData={data} htmlData={article.attributes.content} />
					</div>

					<hr className="uk-divider-small" />
					<div className="uk-grid-small uk-flex-left" data-uk-grid="true">
						<div>
							{article.attributes.author.data.attributes.picture && (
								<img
									src={getStrapiMedia(
										article.attributes.author.data.attributes.picture,
									)}
									alt={
										article.attributes.author.data.attributes.picture.data
											.attributes.alternativeText
									}
									style={{
										position: 'static',
										borderRadius: '20%',
										height: 60,
									}}
								/>
							)}
						</div>
						<div className="uk-width-expand">
							<p className="uk-margin-remove-bottom">
								By {article.attributes.author.data.attributes.name}
							</p>
							<p className="uk-text-meta uk-margin-remove-top">
								<Moment format="MMM Do YYYY">
									{article.attributes.published_at}
								</Moment>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export async function getStaticPaths({ req }) {
	const articlesRes = await fetchAPI('/articles', { fields: ['slug'] });
	const session = await getSession({ req });

	console.log(session);

	return {
		paths: articlesRes.data.map((article) => ({
			params: {
				slug: article.attributes.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params, req }) {
	const session = await getSession({ req });

	console.log(session);

	const articlesRes = await fetchAPI('/articles', {
		filters: {
			slug: params.slug,
		},
		populate: ['image', 'category', 'author.picture'],
	});
	const categoriesRes = await fetchAPI('/categories');

	return {
		props: { article: articlesRes.data[0], categories: categoriesRes },
		revalidate: 1,
	};
}

export default Article;
