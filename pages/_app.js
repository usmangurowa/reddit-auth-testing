import Navbar from '../src/Navbar'
import '../style/style.css'

function MyApp({ Component, pageProps }) {
    return <>
        <Navbar />
        <Component {...pageProps} />
    </>
}
export default MyApp