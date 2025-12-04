from email.message import EmailMessage
from settings import settings

import smtplib

class EmailService:
    def send_message(self, to, token):
        msg = EmailMessage()
        msg['Subject'] = "Сброс пароля в 2048"
        msg['From'] = settings.EMAIL_ADDRESS
        msg['To'] = to
        msg.set_content(token)

        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.EMAIL_ADDRESS, settings.EMAIL_PASSWORD)
            server.send_message(msg)

emailService = EmailService()