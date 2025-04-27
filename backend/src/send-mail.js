import { sendMail } from "./sevices/mail-service.js";

const info = await sendMail({
  to: 'pawel.nowicki87@o2.pl', 
  html: '<h1>Klniknij w link w celu aktywowania konta</h1>', 
  subject: 'Aktywacja konta'
})

console.log(info);