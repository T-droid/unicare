import nodemailer from "nodemailer";
import { emailConfig } from "../config/config";
import { mailTemplate } from "./mailTemplate";

const transporter = nodemailer.createTransport({
        service: emailConfig.emailService,
        host: emailConfig.mailHost,
        port: emailConfig.mailPort,
        auth: {
                user: emailConfig.mailUser,
                pass: emailConfig.mailPassword,
        },
        tls: {
                rejectUnauthorized: false,
        },
});

export enum EmailType {
    APPOINTMENT_UPDATE = "appointment_update",
    //other email types below

}

interface MailOptions {
        to: string;
        subject: string;
        html: string;
        attachments?: any[];
        cc?: any;
        bcc?: any;
        from?: string;
}

export const sendMail = (exports.sendMail = function (details: MailOptions) {
        const mailOptions = {
                to: details.to,
                subject: details.subject,
                html: details.html,
                attachments: details.attachments || [],
                cc: details.cc || null,
                bcc: details.bcc || null,
                from: details.from || emailConfig.mailFrom,
        };

        return new Promise(function (resolve, reject) {
                transporter.sendMail(mailOptions, function (err) {
                        if (err) {
                                reject(err);
                        } else {
                                resolve(true);
                        }
                });
        });
});

exports.sendMessage = (
        email: string,
        messageBody: any,
        attachment: any[] = [],
) => {
        return sendMail({
                to: email,
                attachments: attachment,
                subject: messageBody.subject,
                html: mailTemplate(messageBody.subject, messageBody.body),
        });
};
