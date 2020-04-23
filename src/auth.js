
/*
  Die fetchWithAuth funktion soll funktionieren
  wie das normale fetch, jedoch automatisch den
  jwt header hinzufuegen.
*/

window.AUTH_TOKEN = localStorage.getItem('jwt');

const fetchPost = async (url,opts={})=> {
  opts.method = 'POST'
  if ( ! opts.headers ) opts.headers = {}
  opts.headers['Content-Type'] = 'application/json';
  opts.body = JSON.stringify( opts.body );
  const response = await fetch(url,opts);
  return           await response.json()
}

const fetchWithAuth = async (url,opts={}) => {
  if ( ! opts.headers ) opts.headers = {}
  opts.headers["Sars-CoV-2-Covid-19"] = window.AUTH_TOKEN;
  const response = await fetch(url,opts);
  return           await response.json();
}

export default fetchWithAuth;
export { fetchPost };
