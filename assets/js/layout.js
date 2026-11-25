/* Cabeçalho, rodapé, menu de acessibilidade e preferências salvas — compartilhado por todas as páginas.
   Todas as páginas ficam um nível abaixo da raiz (ex.: /home/), por isso o prefixo "../". */
(function () {
  const raiz = document.documentElement, P = '../';

  /* ---- Preferências de acessibilidade (aplicadas antes de a página aparecer) ---- */
  const PADRAO = { tema: null, fonte: 0, contraste: false, espaco: false, legivel: false, links: false, pausar: false, cursor: false };
  const FONTES = ['normal', 'grande', 'maior', 'extra'];
  const ler = () => { try { return Object.assign({}, PADRAO, JSON.parse(localStorage.getItem('acess'))); } catch (e) { return Object.assign({}, PADRAO); } };
  const aplicar = c => {
    raiz.dataset.theme = c.tema || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    raiz.dataset.font = FONTES[c.fonte] || 'normal';
    ['contraste', 'espaco', 'legivel', 'links', 'pausar', 'cursor'].forEach(k => raiz.toggleAttribute('data-' + k, !!c[k]));
  };
  window.Acess = { PADRAO, ler, aplicar, salvar: c => { localStorage.setItem('acess', JSON.stringify(c)); aplicar(c); } };
  aplicar(ler());
  /* ---- Contador do carrinho (notificação no ícone) ---- */
  const contar = () => { try { return Object.values(JSON.parse(localStorage.getItem('carrinho')) || {}).reduce((t, q) => t + (Number(q) || 0), 0); } catch (e) { return 0; } };
  window.atualizarCarrinho = () => {
    const b = document.getElementById('cart-badge'), l = document.getElementById('cart-link'), v = document.getElementById('cart-live');
    if (!b) return;
    const n = contar(), antes = parseInt(b.dataset.n || '0', 10), txt = `Carrinho: ${n} ${n === 1 ? 'item' : 'itens'}`;
    b.dataset.n = n; b.textContent = n > 99 ? '99+' : n; b.hidden = n === 0;
    l.setAttribute('aria-label', txt); v.textContent = txt;
    if (n > antes) { b.classList.remove('pulo'); void b.offsetWidth; b.classList.add('pulo'); }
  };
  window.addEventListener('storage', () => window.atualizarCarrinho());
  document.head.insertAdjacentHTML('beforeend',
    '<link rel="stylesheet" href="' + P + 'assets/css/estilo.css">' +
    '<link rel="stylesheet" href="' + P + 'assets/css/acess.css">' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@700;800&display=swap">');

  document.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    const menuCats = typeof CATEGORIAS !== 'undefined'
      ? '<nav class="cats" aria-label="Categorias"><div class="container">' +
        Object.entries(CATEGORIAS).map(([k, n]) => `<a href="${P}produtos/?cat=${k}">${(typeof ICONES !== 'undefined' && ICONES[k]) || ''} ${n}</a>`).join('') +
        `<a href="${P}produtos/">Ver tudo</a></div></nav>` : '';

    document.body.insertAdjacentHTML('afterbegin', `
      <a class="skip" href="#conteudo">Pular para o conteúdo</a>
      <div class="promo"><div class="container"><span>🚚 Frete grátis acima de R$ 199</span><span>⚡ 5% off no Pix</span><span>💳 10x sem juros</span></div></div>
      <header class="topo"><div class="container">
        <a class="logo" href="${P}home/">MegaMall</a>
        <form class="busca" role="search" action="${P}produtos/" method="get">
          <label for="q" style="position:absolute;left:-999px">Buscar produtos</label>
          <input id="q" name="q" type="search" placeholder="O que você procura?">
          <button class="btn" type="submit">Buscar</button>
        </form>
        <nav id="menu" aria-label="Principal">
          <a href="${P}produtos/">Produtos</a>
          <a href="${P}contato/">Contatos</a>
      </nav>
      <div class="conta">
      <div class="conta-msg">
      <small id="conta-msg"></small>
      ${usuario ? '<a href="#" id="sair">Sair</a>' : `<a href="${P}login/">Entrar</a>`}
</div>
  <a class="carrinho-link" id="cart-link" href="${P}carrinho/" aria-label="Carrinho, 0 itens">
    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
    <span class="badge" id="cart-badge" aria-hidden="true" hidden>0</span>
  </a>
  <span id="cart-live" class="sr-only" role="status"></span>
</div>
      </div></header>${menuCats}`);

    document.body.insertAdjacentHTML('beforeend', `
      <footer class="rodape" id="rodape">
        <div class="container">
          <div><h3>MegaMall</h3><p>Tecnologia com preço justo. Projeto acadêmico de Desenvolvimento de Interfaces.</p></div>
          <div><h3>Compre</h3><ul><li><a href="${P}produtos/">Todos os produtos</a></li><li><a href="${P}carrinho/">Meu carrinho</a></li></ul></div>
          <div><h3>Ajuda</h3><ul><li><a href="${P}contato/">Fale conosco</a></li><li><a href="${P}acessibilidade/">Acessibilidade</a></li></ul></div>
        </div>
        <div class="container base"><p>© 2026 MegaMall. Site fictício para fins acadêmicos.</p>
          <p class="pag"><span>Pix</span><span>Visa</span><span>Mastercard</span><span>Boleto</span></p></div>
      </footer>`);
    document.getElementById('conta-msg').textContent = usuario ? 'Olá, ' + usuario : 'Olá, faça seu login';
    window.atualizarCarrinho();
    const main = document.querySelector('main'); if (main) main.id = 'conteudo';

    const sair = document.getElementById('sair');
    if (sair) sair.onclick = e => { e.preventDefault(); localStorage.removeItem('usuario'); location.href = P + 'login/'; };

    /* Botão flutuante de acessibilidade */
    const s = document.createElement('script');
    s.src = P + 'assets/js/acess.js';
    document.body.appendChild(s);
  });
})();
