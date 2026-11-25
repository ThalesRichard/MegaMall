/* Central de ajuda: busca e filtro das perguntas + formulário SIMULADO (sem envio real). */
const faqs = [...document.querySelectorAll('details.faq')];
const info = document.getElementById('faq-info');
let assunto = 'todas', termo = '';
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function filtrar() {
  let n = 0;
  faqs.forEach(d => {
    const ok = (assunto === 'todas' || d.dataset.cat === assunto) && norm(d.textContent).includes(norm(termo));
    d.hidden = !ok; if (ok) n++;
  });
  info.textContent = n ? `${n} pergunta(s) encontrada(s)` : 'Nenhuma pergunta encontrada. Fale com a gente pelos canais abaixo.';
}
document.getElementById('busca-ajuda').addEventListener('input', e => { termo = e.target.value.trim(); filtrar(); });
document.querySelectorAll('.assunto').forEach(b => b.addEventListener('click', () => {
  assunto = b.dataset.cat;
  document.querySelectorAll('.assunto').forEach(x => x.setAttribute('aria-pressed', x === b));
  filtrar();
}));
filtrar();

const form = document.getElementById('form-contato'), st = document.getElementById('status'), res = document.getElementById('resultado');
form.addEventListener('submit', e => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg = document.getElementById('msg').value.trim();
  if (!nome) { st.textContent = 'Informe seu nome.'; return; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { st.textContent = 'Digite um e-mail válido, como nome@exemplo.com.'; return; }
  if (msg.length < 10) { st.textContent = 'Escreva uma mensagem com pelo menos 10 caracteres.'; return; }
  const protocolo = 'MM-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
  res.replaceChildren();
  const h = document.createElement('h3'); h.textContent = 'Mensagem enviada!';
  const p1 = document.createElement('p'); p1.textContent = 'Obrigado, ' + nome + '. Responderemos em até 2 dias úteis no e-mail informado.';
  const p2 = document.createElement('p'); p2.textContent = 'Seu protocolo: ';
  const s = document.createElement('strong'); s.textContent = protocolo; p2.appendChild(s);
  res.append(h, p1, p2);
  form.hidden = true; res.hidden = false; res.focus();
});
