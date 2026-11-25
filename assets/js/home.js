/* Carrossel acessível (setas, pausa, sem rotação automática se o usuário reduz movimento) e abas de categoria. */
const slides = [...document.querySelectorAll('.slide')];
const pausa = document.getElementById('car-pausa');
let atual = 0, timer = null;
const mostrar = i => {
  atual = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle('ativo', n === atual));
  document.getElementById('car-info').textContent = `Banner ${atual + 1} de ${slides.length}`;
};
const iniciar = () => { timer = setInterval(() => mostrar(atual + 1), 6000); pausa.textContent = 'Pausar'; };
const parar = () => { clearInterval(timer); timer = null; pausa.textContent = 'Retomar'; };
document.getElementById('car-ant').onclick = () => mostrar(atual - 1);
document.getElementById('car-prox').onclick = () => mostrar(atual + 1);
pausa.onclick = () => (timer ? parar() : iniciar());
mostrar(0);
matchMedia('(prefers-reduced-motion: reduce)').matches ? parar() : iniciar();

/* Ofertas em destaque vindas de catalogo.js, com abas de categoria */
const lista = document.getElementById('lista');
const desenhar = cat => lista.innerHTML = PRODUTOS
  .filter(p => p.destaque && (cat === 'todos' || p.categoria === cat)).map(cardProduto).join('')
  || '<p>Nenhuma oferta nesta categoria.</p>';
montarAbas(document.getElementById('abas'), desenhar);
desenhar('todos');

/* Atalhos de categoria */
document.getElementById('tiles').innerHTML = Object.entries(CATEGORIAS).map(([k, n]) =>
  `<a class="tile" href="../produtos/?cat=${k}"><span aria-hidden="true">${ICONES[k] || '📦'}</span>${n}</a>`).join('');

/* Se a foto de um banner ainda não existir, esconde a imagem em vez de mostrar um ícone quebrado */
document.querySelectorAll('.arte-img').forEach(i => {
  const esconder = () => { i.hidden = true; i.closest('.banner').classList.remove('foto'); };
  i.addEventListener('error', esconder);
  if (i.complete && i.naturalWidth === 0) esconder();
});