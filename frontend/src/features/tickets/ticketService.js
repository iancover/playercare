import axios from 'axios';

// api - proxy: http://localhost:5000
const API_URL = '/api/tickets/';

// POST ticket  /api/tickets/
const createTicket = async (ticketData, token) => {
  // config auth request header w/Bearer token
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // make request
  const res = await axios.post(API_URL, ticketData, config);
  console.log(res.data);
  return res.data;
};

// GET tickets  /api/tickets/
const getTickets = async (token) => {
  // config auth request header w/Bearer token
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // make request
  const res = await axios.get(API_URL, config);
  return res.data;
};

// GET ticket  /api/ticket/:ticketId
const getTicket = async (ticketId, token) => {
  // config auth request header w/Bearer token
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // make request
  const res = await axios.get(API_URL + ticketId, config);
  return res.data;
};

// PUT ticket  /api/ticket/:ticketId
const closeTicket = async (ticketId, token) => {
  // config auth request header w/Bearer token
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // make request
  const res = await axios.put(API_URL + ticketId, { status: 'closed' }, config);
  return res.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
