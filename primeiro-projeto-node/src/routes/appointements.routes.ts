import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(appointment.date, parsedDate),
  );

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'Agendamento ja cadastrado' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  response.json(appointments);
});

export default appointmentsRouter;
