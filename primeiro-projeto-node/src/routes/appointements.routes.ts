import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'Agendamento ja cadastrado' });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  const appointment = appointmentsRepository.all();
  response.json(appointment);
});

export default appointmentsRouter;
