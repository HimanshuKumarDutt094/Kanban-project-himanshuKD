import React from "react";
import KanbanBoard from "./components/Kanban"; // Import your KanbanBoard component
import "/src/styles/App.css";

function App() {
	return (
		<div className="App">
			<h1>Kanban Board App</h1>
			<KanbanBoard /> {/* Render your KanbanBoard component here */}
		</div>
	);
}

export default App;
