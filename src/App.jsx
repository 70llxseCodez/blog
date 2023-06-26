import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/home/Home';
import SingleArticle from './pages/single-article';
import Layout from './components/layout/Layout';
import SignUp from './pages/signup';
import SignIn from './pages/singin';
import Profile from './pages/profile';
import { getUser } from './store/user/user-selector';
import CreateArticle from './pages/create-article/CreateArticle';
import EditArticle from './pages/edit-article';

function App() {
  const { user } = useSelector(getUser);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/article/:id" element={<SingleArticle />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {user ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/new-article" element={<CreateArticle />} />
              <Route path="/edit-articles/:id" element={<EditArticle />} />
            </>
          ) : null}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
