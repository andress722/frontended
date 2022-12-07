import style from './style.module.scss'
import Script from 'next/script'
import Nav from '../../components/Nav'
import { fetchAPI } from '../../lib/api';
import Layout from '../../components/layout';

export default function Contato({categories, articles}){
    return(
    <Layout categories={categories}>
         <div class={style.wrapper}>
             <Script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />
             <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"/>
			<div class={style.inner}>
				<form action="">
					<div className={style.joinGroup}>
						
					<h3>Contact Us</h3>
					
					<div class={style.form_group}>
						<label htmlFor="">Seu nome</label>
						<input type="text" placeholder='Digite seu nome' />
					
						<hr />
					</div>
					<div class={style.form_group}>
						<label htmlFor="">Seu nome</label>
						<input type="text" placeholder='Digite seu nome' />
					
						<hr />
					</div>
			
			<div class={style.form_group}>
						<label htmlFor="">Seu nome</label>
						<input type="text" placeholder='Digite seu nome' />
						
						<hr />
					</div>
			
			
					
					</div>
					<button className='btn'>Submit 
					
					</button>
					
				</form>
				
			</div>
		</div>
		</Layout>
    
    )
}

export async function getStaticProps({ session }) {
	// Run API calls in parallel

	const [categoriesRes] = await Promise.all([
		
		fetchAPI('/categories', { populate: '*' }),
		
	]);

	return {
		props: {
			
			categories: categoriesRes.data,
			
		},
		revalidate: 1,
	};
}