
import { Routes, Route } from 'react-router-dom';
import { Home, Error, PhimBo, PhimLe, HomePage,Phim18Cong,MovieInfo,SapChieu,TVShows,HoatHinh,MovieWatch,Theloai,QuocGia,SearchPage } from './pages/index';
import { path } from './shared/constant';
import { SearchProvider } from './context/SearchContext';
function App() {
  return (
    <SearchProvider> 
      <Routes>
      <Route path={path.HOME} element={<Home />}>
        <Route path={path.HOMEPAGE} element={<HomePage />} />
        <Route path={path.PHIMLE} element={<PhimLe />} />
        <Route path={path.PHIMBO} element={<PhimBo />} />
        <Route path={path.ERROR} element={<Error />} />
        <Route path={path.SAPCHIEU} element={<SapChieu />} />
        <Route path={path.PHIM18CONG} element={<Phim18Cong />} />
        <Route path={path.TVSHOWS} element={<TVShows />} />
        <Route path={path.HOATHINH} element={<HoatHinh />} />
        <Route path={path.MOVIEINFO} element={<MovieInfo />} />
        <Route path={path.XEMPHIM} element={<MovieWatch />} />
        <Route path={path.THELOAI} element={<Theloai />} />
        <Route path={path.QUOCGIA} element={<QuocGia />} />
        <Route path={path.SEARCHRESULTS} element={<SearchPage/>} />
      </Route>
      </Routes>
    </SearchProvider>

   
    
  );
}
export default App;
