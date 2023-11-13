import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import Ticket from "./Ticket";

function KanbanBoard() {
	const [tickets, setTickets] = useState({ tickets: [] });
	const [users, setUsers] = useState({ users: [] });
	const [groupingOption, setGroupingOption] = useState("status");
	const [sortingOption, setSortingOption] = useState("priority");
	let ApiUsers;

	const fetchTicketData = async () => {
		try {
			const response = await fetch(
				"https://api.quicksell.co/v1/internal/frontend-assignment"
			);
			if (response.ok) {
				const data = await response.json();
				setTickets(data); // Update the state with the 'tickets' array
				setUsers(data);
			} else {
				console.error("Failed to fetch data from the API.");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	let userMap = new Map();
	useEffect(() => {
		fetchTicketData();
	}, []);
	ApiUsers = users.users;
	ApiUsers.forEach((m) => {
		userMap = userMap.set(m.name, m.available);
	});
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
							<div className="header">
								{priorityLabels[group.key] === "No Priority" ? (
									<div className="priority-header-box">
										<h3>
											<img
												src="https://cdn-icons-png.flaticon.com/128/9974/9974562.png"
												alt="logo"
											/>
											&nbsp; {priorityLabels[group.key]}
											&nbsp; {group.tickets.length}
										</h3>
										<div className="placeholder-icons">
											<img
												src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
												alt=""
											/>
											&nbsp;
											<img
												src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
												alt=""
											/>
										</div>
									</div>
								) : priorityLabels[group.key] === "Low" ? (
									<div className="priority-header-box">
										<h3>
											<img
												src="https://cdn1.iconfinder.com/data/icons/communication-glyph-surya/24/Signal-low-64.png"
												alt=""
											/>
											&nbsp; {priorityLabels[group.key]}
											&nbsp; {group.tickets.length}
										</h3>
										<div className="placeholder-icons">
											<img
												src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
												alt=""
											/>
											&nbsp;
											<img
												src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
												alt=""
											/>
										</div>
									</div>
								) : priorityLabels[group.key] === "Medium" ? (
									<div className="priority-header-box">
										<h3>
											<img
												src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe8l40QfUbmxF6EMLge837cDHtC8OgGqFrlg&usqp=CAU"
												alt=""
											/>
											&nbsp; {priorityLabels[group.key]}
											&nbsp; {group.tickets.length}
										</h3>
										<div className="placeholder-icons">
											<img
												src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
												alt=""
											/>
											&nbsp;
											<img
												src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
												alt=""
											/>
										</div>
									</div>
								) : priorityLabels[group.key] === "High" ? (
									<div className="priority-header-box">
										<h3>
											<img
												src="https://cdn1.iconfinder.com/data/icons/complete-common-version-6-2/1024/network_bar-512.png"
												alt=""
											/>
											&nbsp; {priorityLabels[group.key]}
											&nbsp; {group.tickets.length}
										</h3>
										<div className="placeholder-icons">
											<img
												src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
												alt=""
											/>
											&nbsp;
											<img
												src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
												alt=""
											/>
										</div>
									</div>
								) : priorityLabels[group.key] === "Urgent" ? (
									<div className="priority-header-box">
										<h3>
											<img
												src="https://cdn2.iconfinder.com/data/icons/complete-common-version-6-7/1024/exclamation-64.png"
												alt=""
											/>
											&nbsp; {priorityLabels[group.key]}
											&nbsp; {group.tickets.length}
										</h3>
										<div className="placeholder-icons">
											<img
												src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
												alt=""
											/>
											&nbsp;
											<img
												src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
												alt=""
											/>
										</div>
									</div>
								) : null}
							</div>
						) : groupingOption === "status" ? (
							group.key === "In progress" ? (
								<div className="status-header-box">
									<h3>
										<img
											src="https://cdn-icons-png.flaticon.com/128/5696/5696031.png"
											alt=""
										/>
										&nbsp; {group.key}
										&nbsp; {group.tickets.length}
									</h3>
									<div className="placeholder-icons">
										<img
											src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
											alt=""
										/>
										&nbsp;
										<img
											src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
											alt=""
										/>
									</div>
								</div>
							) : group.key === "Todo" ? (
								<div className="status-header-box">
									<h3>
										<img
											src="https://cdn-icons-png.flaticon.com/128/11411/11411885.png"
											alt=""
										/>
										&nbsp; {group.key}
										&nbsp; {group.tickets.length}
									</h3>
									<div className="placeholder-icons">
										<img
											src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
											alt=""
										/>
										&nbsp;
										<img
											src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
											alt=""
										/>
									</div>
								</div>
							) : group.key === "Backlog" ? (
								<div className="status-header-box">
									<h3>
										<img
											src="https://cdn-icons-png.flaticon.com/128/9627/9627328.png"
											alt=""
										/>
										&nbsp; {group.key}
										&nbsp; {group.tickets.length}
									</h3>
									<div className="placeholder-icons">
										<img
											src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
											alt=""
										/>
										&nbsp;
										<img
											src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
											alt=""
										/>
									</div>
								</div>
							) : group.key === "Done" ? (
								<div className="status-header-box">
									<h3>
										<img
											src="https://cdn-icons-png.flaticon.com/128/5249/5249095.png"
											alt=""
										/>
										&nbsp; {group.key}
										&nbsp; {group.tickets.length}
									</h3>
									<div className="placeholder-icons">
										<img
											src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
											alt=""
										/>
										&nbsp;
										<img
											src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
											alt=""
										/>
									</div>
								</div>
							) : group.key === "Cancelled" ? (
								<div className="status-header-box">
									<h3>
										<img
											src="https://cdn-icons-png.flaticon.com/128/12796/12796846.png"
											alt=""
										/>
										&nbsp; {group.key}
										&nbsp; {group.tickets.length}
									</h3>
									<div className="placeholder-icons">
										<img
											src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
											alt=""
										/>
										&nbsp;
										<img
											src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
											alt=""
										/>
									</div>
								</div>
							) : null
						) : groupingOption === "User" ? (
							<div className="user-header-box">
								<h3>
									<img
										src={`https://api.minimalavatars.com/avatar/${group.key}/png`}
										alt=""
									/>
									<span
										className={
											userMap.has(group.key) && userMap.get(group.key) === true
												? "status-indicator-active"
												: "status-indicator-inactive"
										}
									></span>
									&nbsp;&nbsp;
									{group.key}
									&nbsp;
									{group.tickets.length}
								</h3>
								<div className="placeholder-icons">
									<img
										src="https://cdn-icons-png.flaticon.com/128/11480/11480703.png"
										alt=""
									/>
									&nbsp;
									<img
										src="https://cdn-icons-png.flaticon.com/128/12380/12380012.png"
										alt=""
									/>
								</div>
							</div>
						) : null}
						{group.tickets.map((ticket) => (
							<Ticket
								group={groupingOption}
								userMap={userMap}
								key={ticket.id}
								ticket={ticket}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default KanbanBoard;
