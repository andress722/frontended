
import { useEffect, useState } from "react"
import styles from './styles.module.scss'
import Send from '../Send'


interface Data{
	email:string
}


export default function Footer(){

	
	const [email, setEmail] = useState('')
	const [cadastro, setCadastro] = useState<Data[]>([])
	const [active, setActive] = useState(false)
	useEffect(()=>{
	console.log(email)
	
		},[email])
	
	useEffect(()=> {
		console.log(cadastro)
	},[cadastro])

	useEffect(()=> {
		if(active === true){
			setInterval(()=>{
				setActive(false)
			}, 3000)
		}
	})

	function sendDataEmail(e:React.ChangeEvent<HTMLInputElement>){
			let dados = e.target.value
			setEmail(dados)

	}

	function handleSubmit(e:React.ChangeEvent<HTMLInputElement> ){
		e.preventDefault()
		

		if(email){
			setCadastro(email)
			setActive(active => !active)
		}	
	}


    return(
        <footer className= {`footer footer-06 navbar-fixed-bottom ${styles.footerDiv}`}>
			<div className={`container ${styles.deskArea}`}>
				<div className="row align-items-center align-items-stretch mb-5">
					<div className="col-md-4 py-4 py-md-5 aside-stretch d-flex align-items-center">
						<div className="w-100">
							<span className="subheading">Se inscreva para receber nossas</span>
							<h3 className="heading-section">Novidades</h3>
						</div>
					</div>
					
					<div className="col-md-8 py-4 py-md-5 d-flex align-items-center pl-md-5 aside-stretch-right">
						{active ? <Send/>: ''}
						<form action="#" className="subscribe-form w-100">
							
								<div className="form-group d-flex">
									<input type="text" className="form-control rounded-left" onChange={sendDataEmail} placeholder="Digite seu e-mail"/>
									<button type="submit" onClick={handleSubmit} className="form-control submit"><span>Enviar</span></button>
								</div>
            			</form>
					</div>
				</div>
        
			</div>
		</footer>
    )
}