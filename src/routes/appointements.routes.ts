import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointServices from '../services/CreateAppointService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointment = appointmentsRepository.all();
  response.json(appointment);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointServices(appointmentsRepository);

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    response.json(appointment);
  } catch (err) {
    return response.status(400).json({ erro: err.message });
  }
});

export default appointmentsRouter;
