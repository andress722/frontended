import { useSession, signIn, signOut } from "next-auth/react"
import style from './style.module.scss'
export default function LoginButton() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        <span> Signed in as {session.user.email}</span> <br />
        <button  className={`btn btn-primary ${style.buttonStyle}`} onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <span className={style.textSpan}> Not signed in</span> <br />
      <button  className={`btn btn-primary ${style.buttonStyle}`} onClick={() => signIn()}>Sign in</button>
    </>
  )
}