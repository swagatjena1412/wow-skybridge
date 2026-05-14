
import { getEmailHtml, EMAIL_SUBJECT } from "./lib/email-template.js";
const html = getEmailHtml("https://skybridge-ae.vercel.app");
process.stdout.write(JSON.stringify({ html, subject: EMAIL_SUBJECT }));
