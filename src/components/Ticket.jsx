import React from "react";
function Ticket({ ticket }) {
	return (
		<div className="ticket-card">
			<div className="card-id">{ticket.id}</div>
			<div className="card-title">{ticket.title}</div>
			<div className="card-grp">
				<div className="card-priority">{ticket.priority}</div>
				<div className="card-status">{ticket.status}</div>
			</div>
		</div>
	);
}

export default Ticket;
