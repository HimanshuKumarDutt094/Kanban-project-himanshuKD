import React from "react";
import KanbanBoard from "./components/Kanban"; // Import your KanbanBoard component
import "/src/styles/App.css";

function App() {
	return (
		<div className="App">
			<KanbanBoard /> {/* Render your KanbanBoard component here */}
		</div>
	);
}

export default App;
