import react from 'react';
import '../style/Home.css';
import SqureBtnLinkType from './support/SqureBtnLinkType';
import TopImg from '../images/top-right.png';
// import About from '../pages/About';
import MainFooter from './MainFooter';
import { AboutSection } from '../pages/About';
const Home = () => {

    return (<>
        <div className="container-fluid curved">
            <div className="container pt-5 mt-3">
                <div className='row'>
                    <div className='col-xxl-6 col-xl-6 col-lg-6 col-xl-6 col-md-12 m-auto'>
                        <div className='text-wellcome pb-4'>
                            <h2 className="mt-3">Explore Your Live Project As Internship</h2>
                            <h3 className="mt-3">Best Way To Kickstart Your Career </h3>
                            <p className="mt-3 mb-4"> we are the largest professional community to provide a real time project experience to fresher.
                            </p>
                            <div className='row col-12 col-lg-11'>
                                <SqureBtnLinkType link='/login/signup' title='Explore Projects' />
                                <SqureBtnLinkType link='/organization/login/signup' title='Start Hiring' />
                            </div>
                        </div>
                    </div>
                    <div className='col-xxl-6 col-xl-6 col-lg-6 col-xl-6 col-md-12 m-auto'>
                        <img src={TopImg} className="img-fluid pb-3" alt="image not found"></img>
                    </div>
                </div>
            </div>
        </div>
        <AboutSection />
        <MainFooter />
    </>
    );
}
export default Home;