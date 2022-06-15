import axios from 'axios';

// api - proxy: http://localhost:5000
const API_URL = '/api/tickets/';

// POST ticket  /api/tickets/,  store local & return
const createNewTicket = async (ticketData, token) => {
  // config auth request header w/Bearer token
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  // make request
  const res = await axios.post(API_URL, ticketData, config);
  return res.data;
};

const ticketService = {
  createNewTicket,
};

export default ticketService;
