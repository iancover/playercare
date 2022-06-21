import axios from 'axios';

// api - proxy: http://localhost:5000
const API_URL = '/api/tickets/';

// POST   /api/tickets/:ticketId/notes
const addNote = async (noteText, ticketId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(
    `${API_URL}${ticketId}/notes`,
    { text: noteText },
    config
  );
  // console.log(res.data);
  return res.data;
};

// GET    /api/tickets/:ticketId/notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${API_URL}${ticketId}/notes`, config);
  // console.log(res.data);
  return res.data;
};

const noteService = {
  addNote,
  getNotes,
};

export default noteService;
