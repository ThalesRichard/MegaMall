/* Botão flutuante + painel de acessibilidade (lado direito da tela).
   Usa window.Acess, definido em layout.js. */
(function () {
  const A = window.Acess, raiz = document.documentElement, P = '../';
  if (!A) return;

  const OPCOES = [
    ['tema', 'Modo escuro'], ['contraste', 'Alto contraste'], ['espaco', 'Espaçamento do texto'],
    ['legivel', 'Fonte legível'], ['links', 'Destacar links'], ['pausar', 'Pausar animações'], ['cursor', 'Cursor grande']
  ];
  const NIVEIS = ['100%', '125%', '150%', '175%'];

  document.body.insertAdjacentHTML('beforeend', `
    <button id="acess-btn" class="acess-btn" type="button" aria-expanded="false" aria-controls="acess-painel"
            aria-label="Abrir menu de acessibilidade" title="Acessibilidade (Alt+0)">
      <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false">
        <circle cx="12" cy="4" r="2.2" fill="currentColor"/>
        <path d="M4 8.5h16v2.2h-6V14l2.2 7h-2.4L12 15.2 10.2 21H7.8L10 14v-3.3H4z" fill="currentColor"/>
      </svg>
    </button>
    <section id="acess-painel" class="acess-painel" role="dialog" aria-labelledby="acess-titulo" hidden>
      <div class="acess-topo">
        <h2 id="acess-titulo" tabindex="-1">Acessibilidade</h2>
        <button type="button" id="acess-fechar" aria-label="Fechar menu de acessibilidade">✕</button>
      </div>
      <p>Ajuste o site ao que for mais confortável para você. Suas escolhas ficam salvas neste navegador.</p>
      <h3>Tamanho do texto</h3>
      <div class="acess-linha">
        <button type="button" data-fonte="-1" aria-label="Diminuir o texto">A−</button>
        <span id="acess-nivel" role="status"></span>
        <button type="button" data-fonte="1" aria-label="Aumentar o texto">A+</button>
      </div>
      <h3>Visual e leitura</h3>
      <div class="acess-grade">
        ${OPCOES.map(([k, n]) => `<button type="button" class="acess-op" data-op="${k}" aria-pressed="false">${n}</button>`).join('')}
      </div>
      <h3>Libras</h3>
      <button type="button" id="acess-libras" class="acess-op acess-largo">Abrir tradutor VLibras</button>
      <button type="button" id="acess-reset" class="acess-op acess-largo">Restaurar padrão</button>
      <h3>Atalhos de teclado</h3>
      <ul class="acess-atalhos">
        <li><kbd>Alt</kbd> + <kbd>1</kbd> ir para o conteúdo</li>
        <li><kbd>Alt</kbd> + <kbd>2</kbd> ir para o início</li>
        <li><kbd>Alt</kbd> + <kbd>3</kbd> ir para o menu</li>
        <li><kbd>Alt</kbd> + <kbd>4</kbd> ir para a busca</li>
        <li><kbd>Alt</kbd> + <kbd>0</kbd> abrir ou fechar este painel</li>
        <li><kbd>Esc</kbd> fechar este painel</li>
      </ul>
      <p><a href="${P}acessibilidade/">Declaração de acessibilidade</a></p>
      <p id="acess-aviso" role="status"></p>
    </section>`);

  const btn = document.getElementById('acess-btn');
  const painel = document.getElementById('acess-painel');
  const aviso = document.getElementById('acess-aviso');

  const render = () => {
    const cfg = A.ler();
    painel.querySelectorAll('[data-op]').forEach(b => {
      const k = b.dataset.op;
      b.setAttribute('aria-pressed', k === 'tema' ? raiz.dataset.theme === 'dark' : !!cfg[k]);
    });
    document.getElementById('acess-nivel').textContent = 'Texto a ' + NIVEIS[cfg.fonte || 0];
  };

  const abrir = () => {
    painel.hidden = false; btn.setAttribute('aria-expanded', 'true');
    document.getElementById('acess-titulo').focus();
  };
  const fechar = () => { painel.hidden = true; btn.setAttribute('aria-expanded', 'false'); btn.focus(); };

  const pausarCarrossel = () => {
    const p = document.getElementById('car-pausa');
    if (p && p.textContent.trim() === 'Pausar') p.click();
  };

  const libras = () => {
    aviso.textContent = '';
    const abrirJanela = () => { const b = document.querySelector('[vw-access-button]'); if (b) b.click(); };
    if (document.querySelector('[vw]')) return abrirJanela();
    document.body.insertAdjacentHTML('beforeend',
      '<div vw class="enabled"><div vw-access-button class="active"></div>' +
      '<div vw-plugin-wrapper><div class="vw-plugin-top-wrapper"></div></div></div>');
    const s = document.createElement('script');
    s.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    s.onload = () => { new window.VLibras.Widget('https://vlibras.gov.br/app'); setTimeout(abrirJanela, 1500); };
    s.onerror = () => { aviso.textContent = 'Não foi possível carregar o VLibras. Verifique sua conexão com a internet.'; };
    document.head.appendChild(s);
    aviso.textContent = 'Carregando o tradutor de Libras…';
  };

  btn.addEventListener('click', () => (painel.hidden ? abrir() : fechar()));

  painel.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const cfg = A.ler();
    if (b.id === 'acess-fechar') return fechar();
    if (b.id === 'acess-libras') return libras();
    if (b.dataset.fonte) cfg.fonte = Math.min(3, Math.max(0, (cfg.fonte || 0) + Number(b.dataset.fonte)));
    else if (b.dataset.op) {
      const k = b.dataset.op;
      if (k === 'tema') cfg.tema = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
      else cfg[k] = !cfg[k];
      if (k === 'pausar' && cfg.pausar) pausarCarrossel();
    }
    else if (b.id === 'acess-reset') Object.assign(cfg, A.PADRAO);
    else return;
    A.salvar(cfg); render();
  });

  /* Atalhos de teclado (padrão usado em sites do governo): Alt + número */
  const foco = el => {
    if (!el) return;
    if (!el.matches('a,button,input')) el.tabIndex = -1;
    el.focus(); el.scrollIntoView({ block: 'start' });
  };
  const ATALHOS = {
    Digit1: () => foco(document.getElementById('conteudo')),
    Digit2: () => foco(document.querySelector('.logo')),
    Digit3: () => foco(document.querySelector('#menu a')),
    Digit4: () => foco(document.getElementById('q')),
    Digit0: () => (painel.hidden ? abrir() : fechar())
  };
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !painel.hidden) return fechar();
    if (!e.altKey || e.ctrlKey || e.metaKey || !ATALHOS[e.code]) return;
    e.preventDefault(); ATALHOS[e.code]();
  });

  render();
  if (A.ler().pausar) pausarCarrossel();
})();
