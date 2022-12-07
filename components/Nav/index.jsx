import Link from 'next/link';
import Image from 'next/image';
import imgBanner from '../../public/images/autismo.png';
import styles from './style.module.scss';
import Script from 'next/script'
import LoginButton from '../LoginButton';
import { FaGithub, FaFacebookSquare,FaWhatsappSquare } from 'react-icons/fa'


const Nav = ({ categories }) => {

	
  
	return (
    
					
    
    <section className={`ftco-section ${styles.sectinMarg}`}>
              <Script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />
             <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"/>

		
		<div className={`container-fluid ${styles.heightContainerMenu}`}>
			<div className="row d-flex justify-content-between">
				
					<div className="row align-middle">
						<div className="container-fluid d-flex justify-content-around align-middle ">
							<Image width={100} height={50} src={imgBanner} />
							<div className="col-md-2 d-flex flex-end">
								<div className="social-media d-flex ">
								
									<FaGithub size={30} color="#FFB800"/>
									<FaFacebookSquare size={30} color="#39adeb"/>
									<FaWhatsappSquare size={30} color='#44f618' />
									

								</div>
							</div>
				
							 						
						</div>
						
					</div>
			
			</div>
		</div>
		<nav className={`navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light ${styles.backGround}`} id="ftco-navbar">
	    <div className="container-fluid">
	    
	      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span className="fa fa-bars"></span> Menu
	      </button>
	      <div className="collapse navbar-collapse" id="ftco-nav">
	        <ul className="navbar-nav m-auto">
	        	<li className="nav-item active"><a href="/" className="nav-link">Home</a></li>
	        	<li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Page</a>
              <div className="dropdown-menu" aria-labelledby="dropdown04">
				{categories.map(el => {
					return(
						
						<a key={el.attributes.id} className='dropdown-item' href='#'>{el.attributes.name}</a>
					)
				})}
              
              </div>
            </li>
	        	
	        	<li className="nav-item"><a href="/blog" className="nav-link">Blog</a></li>
	          <li className="nav-item"><a href="/contato" className="nav-link">Contato</a></li>
	        </ul>
         
					
						
	      </div>  
       
        		<form action="#" className="searchform order-lg-last mt-1">
			          <div className="form-group d-flex">
			            <input type="text" className="form-control pl-3" placeholder="Search"/>
			            <i class="bi bi-search"></i>
			          </div>
			        </form>
             
      
	    </div>
      
	  </nav>
 

	</section>

  

	);
};

export default Nav;
