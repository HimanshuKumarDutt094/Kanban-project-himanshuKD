import React from "react";
function Ticket({ ticket, userMap, group }) {
	console.log(group);
	const priorityLabels = {
		4: "https://cdn2.iconfinder.com/data/icons/complete-common-version-6-7/1024/exclamation-64.png",
		3: "https://cdn1.iconfinder.com/data/icons/complete-common-version-6-2/1024/network_bar-512.png",
		2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe8l40QfUbmxF6EMLge837cDHtC8OgGqFrlg&usqp=CAU",
		1: "https://cdn1.iconfinder.com/data/icons/communication-glyph-surya/24/Signal-low-64.png",
		0: "https://cdn-icons-png.flaticon.com/128/9974/9974562.png",
	};
	return (
		<div className="ticket-card">
			<div className="card-id">
				<div>{ticket.id}</div>
				{group !== "User" ? (
					<h3>
						<img
							src={`https://api.minimalavatars.com/avatar/${ticket.user.name}/png`}
							alt=""
						/>
						<span
							className={
								userMap.has(ticket.user.name) &&
								userMap.get(ticket.user.name) === true
									? "status-indicator-active"
									: "status-indicator-inactive"
							}
						></span>
					</h3>
				) : null}
			</div>

			<div className="card-title">{ticket.title}</div>
			<div className="card-grp">
				<div className="card-priority">
					<img src={priorityLabels[ticket.priority]} alt="" />
				</div>
				<div className="card-tag">
					&nbsp;
					<img
						src="https://cdn-icons-png.flaticon.com/128/5720/5720434.png"
						alt="logo"
					/>{" "}
					&nbsp;
					{ticket.tag}
				</div>
			</div>
		</div>
	);
}

export default Ticket;
