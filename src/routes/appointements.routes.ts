import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointServices from '../services/CreateAppointService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointment = await appointmentsRepository.find();
  response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointServices();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });

    response.json(appointment);
  } catch (err) {
    return response.status(400).json({ erro: err.message });
  }
});

export default appointmentsRouter;
