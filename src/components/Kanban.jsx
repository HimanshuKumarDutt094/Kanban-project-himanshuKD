import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import Ticket from "./Ticket";

function KanbanBoard() {
	const [tickets, setTickets] = useState({ tickets: [] });
	const [users, setUsers] = useState({ users: [] });
	const [groupingOption, setGroupingOption] = useState("status");
	const [sortingOption, setSortingOption] = useState("priority");

	const fetchTicketData = async () => {
		try {
			const response = await fetch(
				"https://api.quicksell.co/v1/internal/frontend-assignment"
			);
			if (response.ok) {
				const data = await response.json();
				setTickets(data); // Update the state with the 'tickets' array
				setUsers(data); // Update the state with the 'users' array
			} else {
				console.error("Failed to fetch data from the API.");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	useEffect(() => {
		fetchTicketData();
	}, []);

	const groupedAndSortedTickets = () => {
		const grouped = {};

		// Merge users with tickets based on userId
		const mergedTickets = tickets.tickets.map((ticket) => {
			const user = users.users.find((user) => user.id === ticket.userId);

			return { ...ticket, user };
		});
		mergedTickets.forEach((ticket) => {
			let groupKey;
			if (groupingOption === "status") {
				groupKey = ticket.status;
			} else if (groupingOption === "User") {
				groupKey = ticket.user.name;
				console.log(groupKey);
			} else if (groupingOption === "priority") {
				groupKey = ticket.priority;
			}

			if (!grouped[groupKey]) {
				grouped[groupKey] = [];
			}

			grouped[groupKey].push(ticket);
		});

		const sortedGroups = Object.keys(grouped).sort((a, b) => {
			if (sortingOption === "priority") {
				return b - a;
			} else if (sortingOption === "title") {
				return a.localeCompare(b);
			}
		});

		sortedGroups.forEach((group) => {
			grouped[group].sort((a, b) => {
				if (sortingOption === "title") {
					return a.title.localeCompare(b.title);
				}
			});
		});

		return sortedGroups.map((group) => ({
			key: group,
			tickets: grouped[group],
		}));
	};
	const priorityLabels = {
		4: "Urgent",
		3: "High",
		2: "Medium",
		1: "Low",
		0: "No Priority",
	};
	return (
		<div>
			<FilterBar
				onGroupingChange={setGroupingOption}
				onSortingChange={setSortingOption}
			/>{" "}
			<div className="kanban-board">
				{groupedAndSortedTickets().map((group) => (
					<div key={group.key} className="ticket-column">
						{groupingOption === "priority" ? (
							<h2>
								{priorityLabels[group.key] ? priorityLabels[group.key] : " "}
								&nbsp;
								{group.tickets.length}{" "}
							</h2>
						) : (
							<h2>
								{group.key} {group.tickets.length}
							</h2>
						)}
						{group.tickets.map((ticket) => (
							<Ticket key={ticket.id} ticket={ticket} />
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default KanbanBoard;
