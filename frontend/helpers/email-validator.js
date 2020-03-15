export default function(email) {
  const REG_EMAIL = new RegExp(/(.+)@(.+){1,}\.(.+){2,}/);
  return REG_EMAIL.test(email);
}
