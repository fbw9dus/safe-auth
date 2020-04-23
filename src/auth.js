
/*
  Die fetchWithAuth funktion soll funktionieren
  wie das normale fetch, jedoch automatisch den
  jwt header hinzufuegen.
*/

window.AUTH_TOKEN = localStorage.getItem('jwt');

const fetchWithAuth = async (url,opts={}) => {
  if ( ! opts.headers ) opts.headers = {}
  opts.headers["Sars-CoV-2-Covid-19"] = window.AUTH_TOKEN;
  const response = await fetch(url,opts);
  return           await response.json();
}

export default fetchWithAuth;
