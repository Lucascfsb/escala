import { Router } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

const passwordRouter = Router();

passwordRouter.post('/forgot', async (request, response) => {
  const { email } = request.body;

  const sendForgotPasswordEmail = new SendForgotPasswordEmailService(); 
  await sendForgotPasswordEmail.execute({ email });

  return response.status(204).json(); 
});

export default passwordRouter;