const urlRegEx = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
module.exports = {
  urlRegEx,
};

const allowedCors = [
  'https://api.mariatektova.diploma.nomoredomains.rocks',
  'https://api.mariatektova.diploma.nomoredomains.rocks',
  'http://api.mariatektova.diploma.nomoredomains.rocks',
  'http://api.mariatektova.diploma.nomoredomains.rocks',
  'https://localhost:3000',
  'http://localhost:3000',
];

module.exports = allowedCors;