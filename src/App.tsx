import HomeView from './components/pages/homeView';
import CreateAndEditView from './components/pages/createAndEditView';
import ReadView from './components/pages/readView';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export default function App() {
	const history = createBrowserHistory();
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route path="/home" exact component={HomeView} />
					<Route path="/create" exact component={CreateAndEditView} />
					<Route path="/edit" exact component={CreateAndEditView} />
					<Route path="/read" exact component={ReadView} />
					<Route path="/" component={HomeView} />
				</Switch>
			</Router>
		</div>
	);
}
