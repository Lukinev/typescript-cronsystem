import * as nodemailer from 'nodemailer';
import SmtpTransport from 'nodemailer-smtp-transport';

interface ImailOptions {
    from?: string; // sender address
    to: string, // list of receivers
    subject: string, // Subject line
    text: string, // plain text body
    html?: string, // html body
    attachments?: Array<{ filename: string, path: string }>
};

export let sendMail = function (mailOptions: ImailOptions): void {
    mailOptions.from = 'admin@fortuna.odessa.ua';
    let transporter = nodemailer.createTransport(SmtpTransport({
        host: 'bsd3server.fortuna.odessa.ua',
        port: 25,
        secure: false,
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    }));

    nodemailer.createTestAccount((err: any, account: any) => {
        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    })
};
