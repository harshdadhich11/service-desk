import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/authContext';

const Tickets = () => {
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    priority: 'Low',
    category: '',
  });

  const { description, priority, category } = formData;

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tickets', {
        headers: { 'x-auth-token': token },
      });
      setTickets(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tickets', formData, {
        headers: { 'x-auth-token': token },
      });
      setTickets([res.data, ...tickets]);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Tickets</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={onChange}
            required
            placeholder="Enter ticket description"
          />
        </div>
        <div>
          <label htmlFor="priority">Priority</label>
          <select name="priority" value={priority} onChange={onChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={onChange}
            required
            placeholder="Enter ticket category"
          />
        </div>
        <button type="submit">Create Ticket</button>
      </form>
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li key={ticket._id} className="ticket-item">
            <p>Description: {ticket.description}</p>
            <p>Priority: {ticket.priority}</p>
            <p>Category: {ticket.category}</p>
            <p>Status: {ticket.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;
