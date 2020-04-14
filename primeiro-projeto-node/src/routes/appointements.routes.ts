import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';

const appointmentsRouter = Router();

const apointments = [];

appointmentsRouter.post('/', (request, response) => {
  const { name, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const apointment = {
    id: uuid(),
    name,
    date: parsedDate,
  };

  apointments.push(apointment);

  response.json(apointment);
});

appointmentsRouter.get('/', (request, response) => {
  response.json({ message: 'deu bom' });
});

export default appointmentsRouter;
