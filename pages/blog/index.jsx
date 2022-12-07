import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';

import { RichText } from '@graphcms/rich-text-react-renderer';

import Seo from '../../components/seo';
import style from './style.module.scss'
import rehypeRaw from 'rehype-raw';
import { fetchAPI } from '../../lib/api';

import Link from 'next/link';
import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from 'react-html-parser';
import Nav from '../../components/Nav';
import useSWR from 'swr'
import { data } from 'autoprefixer';
import Footer from '../../components/Footer';
import Layout from '../../components/layout';
import ReactPaginate from 'react-paginate';

const Blog = ({articles, categories, home }) => {
	const [pagination, setPagination] = useState(1)
	const [editorLoaded, setEditorLoaded] = useState(false);
	const [dataFetch, setFetchData] = useState(null)
	const [load, setLoad] = useState(false)
	const links = []
	const [pageCount, setPageCount] = useState(null)
	const [correctImg, setCorrectImg] = useState([])

	useEffect(()=> {
		
			if(pagination < 1){
				setPagination(1)
			}
			
		},[pagination])

	useEffect(()=> {

		setPageCount(home.meta.pagination.pageCount)
		console.log(pageCount)
	}, [pageCount])

	useEffect(() => {
		setEditorLoaded(true);
	}, []);

	useEffect(()=> {
		if(dataFetch === null){

			fetchApiPage()
			
		}else{
			fetch(`http://localhost:1337/api/articles?pagination[page]=${pagination}&pagination[pageSize]=4`)
				.then((response)=> response.json())
				.then((data) => {
					setFetchData(data.data)
					setLoad(true)
					imgCorrect()
				})
		}
	},[pagination,dataFetch])

	 function fetchApiPage(){

			if(dataFetch === null){
				fetch(`http://localhost:1337/api/articles?pagination[page]=${pagination}&pagination[pageSize]=4`)
				.then((response)=> response.json())
				.then((data) => {
					setFetchData(data.data)
					setLoad(true)
					imgCorrect()
				})
			}
		
			
		}
		

		function handleClick(event){
			const page = event.target.innerText
			setPagination(page)
		
			if(pagination < pageCount){
				console.log('entrou no if pageCount')
				
				if(pagination > pageCount){
					
					alert('Impossivel executar')
					
				}
				else{
					setPagination(page)
					alert('alterou')
				}
			
			}
			console.log('page' + page)
			console.log('pagination' + pagination)
		}

		function backPaginationClick(){
			if(pagination <= 1){
				alert('Impossivel retroceder')
				

			}else{
				setPagination(pagination -1)
			}
			console.log(pagination)
		}

		


	function imgCorrect(){
		if(dataFetch != null){
			for(let i = 0; i<dataFetch.length;i++){
				if(dataFetch[i].attributes.id === articles[i].attributes.id){
					links.push(articles[i].attributes.image.data.attributes.url)
				}
			}
		}
		setCorrectImg(links)
	}

	if(dataFetch !== null)
	return (	
		
		<Layout categories={categories}>
            <div>
				
                <div className={style.organizeBlog}>

					
                    {load && dataFetch.map((ele,i )=> {
						
                        return(
                            <div key={ele.id}>
                                <div className={style.articleBlog}>	

							
								<img key={correctImg[i]} src={`http://localhost:1337`+correctImg[i]} alt="" />
								
									
									
                                    <h2>{ele.attributes.title}</h2>
									<p>
										{ele.attributes.smallcontent}
										</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
					

			<nav className='text-center list-group align-items-center'  aria-label="Page navigation example">
				<ul  className="list-group list-group-horizontal align-items-center">
					<li className="list-group-item">
						<a onClick={backPaginationClick} id='previous' className="page-link" href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</a>
					</li>
					
					{Array(pageCount).fill().map((x,i)=>{
						return(
							<li onClick={handleClick} key={i+1} className="list-group-item align-items-center">
								<a className="page-link" href='#'>{i+1}</a>
							</li>
						)
					})}

					
					
					<li className="list-group-item align-items-center">
						<a className="page-link" href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
							<span className="sr-only">Next</span>
						</a>
					</li>
				</ul>
			</nav>
			
            </div>
	</Layout>	
	);
	
};
export async function getStaticProps() {
	// Run API calls in parallel

    
	const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
		fetchAPI('/articles', { populate: ['image', 'category'] }),
		fetchAPI('/categories', { populate: '*' }),
		fetchAPI('/articles?pagination[page]=1&pagination[pageSize]=3')
		
	]);


	return {
		props: {
			articles: articlesRes.data,
			categories: categoriesRes.data,
			home: homepageRes
		},
		revalidate: 1,
	};
}

export default Blog