import { Footer, Header } from '../components/MainLayOut/index.js';
import { NavBar, SideBar, Title } from '../components/MainLayOut/index.js';
import { Outlet } from 'react-router-dom';


const Home = ({}) => {
  return (
    <div className='bg-[#222d38]'>
      <Title value='Cuồng Phim | Xem phim thỏa thích' />
      <Header />
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
