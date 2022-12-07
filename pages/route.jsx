import { getSession } from "next-auth/react";

export default function Route(){
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export const getServerSideProps = async ({ req, params}) => {
  const session = await getSession({ req });

  console.log(session)

    return{
        props: {

        }
    }
}