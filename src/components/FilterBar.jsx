import React, { useState } from "react";

function FilterBar({ onGroupingChange, onSortingChange }) {
	const [filterBarVisible, setFilterBarVisible] = useState(false);

	// Function to toggle the filter bar visibility
	function toggleFilterBar() {
		setFilterBarVisible(!filterBarVisible);
	}

	return (
		<div className="filter">
			<div className="menu" onClick={toggleFilterBar}>
				<select>
					<option value="">Display</option>
				</select>
			</div>

			<div className={`filter-bar ${filterBarVisible ? "visible" : "hidden"}`}>
				<div className="grouping">
					<div>
						<label htmlFor="grouping-select">Grouping </label>
					</div>
					<div>
						<select
							id="grouping-select"
							onChange={(e) => onGroupingChange(e.target.value)}
						>
							<option value="status">Status</option>
							<option value="User">User</option>
							<option value="priority">Priority</option>
						</select>
					</div>
				</div>
				<div className="ordering">
					<label htmlFor="sorting-select">Ordering </label>
					<select
						id="sorting-select"
						onChange={(e) => onSortingChange(e.target.value)}
					>
						<option value="priority">Priority</option>
						<option value="title">Title</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default FilterBar;
