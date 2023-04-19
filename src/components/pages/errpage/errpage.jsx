import { useRouteError } from "react-router-dom";
import Layout from "../../layouts";
import errimg from '../../assets/404.png'

export default function ErrorPage(){
    const error = useRouteError();
    console.log(error)

    return(
        <Layout>
        <div id="error-page" className="p-6 max-w-[1240px] mx-auto">
            <div>
                <img src={errimg} alt='/'/>
            </div>
            <div>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    {error.statusText || error.message}
                </p>
            </div>
        </div>
        </Layout>
    )
}