import './App.css';
import { AdminDashboard } from './components/AdminDashboard';
import { RootTheme } from './components/RootTheme';
import { Header } from './components/Header';

function App() {
	return (
		<RootTheme>
			<div className="App">
				<Header />
				<AdminDashboard />
			</div>
		</RootTheme>
	);
}

export default App;
