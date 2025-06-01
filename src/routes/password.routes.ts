import { Router } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';
import ResetPasswordService from '../services/ResetPasswordService';

const passwordRouter = Router();

passwordRouter.post('/forgot', async (request, response) => {
  const { email } = request.body;

  const sendForgotPasswordEmail = new SendForgotPasswordEmailService(); 
  await sendForgotPasswordEmail.execute({ email });

  return response.status(204).json(); 
});

passwordRouter.post('/reset', async (request, response) => {
  const { password, password_confirmation, token } = request.body;

  const resetPasswordService = new ResetPasswordService();
  await resetPasswordService.execute({
    token,
    password,
    password_confirmation
  });

  return response.status(204).json();
});

export default passwordRouter;