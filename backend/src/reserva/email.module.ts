/* eslint-disable prettier/prettier */
// email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT ?? '587'), // Se usa 587 como valor por defecto pero se puede cambiar
        auth: {
          user: process.env.MAIL_USER ?? '',
          pass: process.env.MAIL_PASS ?? '',
        },
      },
      defaults: {
        from: '"BreazeInTheMoon" <noreply@breaze.com>',
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
