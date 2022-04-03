import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Mainlist from './MainList';
import Navbar from './Navbar';
import CreateArticle from '../blogController/PostArticle'
import Article from './Article';

function App() {

  return (
    <div>

    <Router>
    <Navbar/>
        <Switch>
          <Route path="/" exact>
            <Mainlist />
          </Route>
          <Route path="/create">
            <CreateArticle />
          </Route>
          <Route path="/Article/:articleId">
            <Article></Article>
          </Route>
        </Switch>
    </Router>

    </div>
  );
}

export default App;
