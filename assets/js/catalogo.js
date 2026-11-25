/* ============================================================
   CATÁLOGO DE PRODUTOS — é aqui que você adiciona produtos.
   Para cadastrar um novo, copie um bloco { ... } da lista PRODUTOS,
   use um "id" que ainda não exista e ajuste os campos.
   A foto fica em assets/img/produtos/<categoria>/<arquivo>.
   Preços fictícios, baseados em faixas de preço de lojas brasileiras (nov/2026).
   ============================================================ */
const CATEGORIAS = {            // chave (usada nos produtos) : nome exibido
  notebooks: 'Notebooks',
  celulares: 'Celulares',
  games: 'Games',
  audio: 'Áudio',
  acessorios: 'Acessórios',
  monitores: 'Monitores & TVs'
};
const ICONES = { notebooks: '💻', celulares: '📱', games: '🎮', audio: '🎧', acessorios: '⌨️', monitores: '📺' };   // ícone de cada categoria

/* "precoAntigo" é opcional: se existir, aparece riscado e gera o selo de desconto. */
const PRODUTOS = [
  { id: 1, nome: 'Notebook Galaxy Book5', categoria: 'notebooks', preco: 5299.90, precoAntigo: 6299.90, parcelas: 10,
    foto: 'notebooks/Galaxy Book5.jpg', emoji: '💻', destaque: true,
    descricao: 'Tela LED de 15,6" Full HD antirreflexo, 16 GB de RAM LPDDR5X, 512 GB de SSD e peso de 1,6 kg.' },
  { id: 2, nome: 'Acer Nitro V16', categoria: 'notebooks', preco: 6799.90, precoAntigo: 7999.90, parcelas: 10,
    foto: 'notebooks/Acer Nitro V16.jpg', emoji: '🖥️', destaque: true,
    descricao: 'Placa de vídeo dedicada e tela de 165 Hz para jogar sem travar.' },
  { id: 3, nome: 'Iphone X 128 GB', categoria: 'celulares', preco: 1799.90, precoAntigo: 2199.90, parcelas: 10,
    foto: 'celulares/iphone x.jpg', emoji: '📱', destaque: true,
    descricao: 'Câmera dupla, bateria para o dia todo e 128 GB de armazenamento.' },
  { id: 4, nome: 'Poco c71 180 GB', categoria: 'celulares', preco: 899.90, parcelas: 10,
    foto: 'celulares/poco c71.jpg', emoji: '📱', destaque: false,
    descricao: 'Modelo de entrada com tela grande e ótimo custo-benefício.' },
  { id: 5, nome: 'Controle PS5 DualSense', categoria: 'games', preco: 379.90, precoAntigo: 469.90, parcelas: 3,
    foto: 'games/controle ps5.jpg', emoji: '🎮', destaque: true,
    descricao: 'Controle com vibração, conexão sem fio e bateria recarregável.' },
  { id: 6, nome: 'Havit H2002D Pro', categoria: 'games', preco: 229.90, parcelas: 3,
    foto: 'games/fone gamer.jpg', emoji: '🎧', destaque: false,
    descricao: 'Headset Gamer Havit H2002d Pro Preto, Potência Sonora com Drivers de 53 mm e Áudio Espacial' },
  { id: 7, nome: 'Fone Bluetooth Pro', categoria: 'audio', preco: 429.90, precoAntigo: 549.90, parcelas: 4,
    foto: 'audio/fone.jpg', emoji: '🎧', destaque: true,
    descricao: 'Cancelamento de ruído e até 30 horas de bateria.' },
  { id: 8, nome: 'boombox 2', categoria: 'audio', preco: 2599.00, precoAntigo: 3199.00, parcelas: 3,
    foto: 'audio/boombox 2.jpg', emoji: '🔊', destaque: false,
    descricao: 'Resistente à água, com graves potentes.' },
  { id: 9, nome: 'Soundbar 2.1', categoria: 'audio', preco: 999.90, parcelas: 10,
    foto: 'audio/Soundbar 2.1.jpg', emoji: '🔊', destaque: false,
    descricao: 'Som de cinema para a sua TV, com subwoofer sem fio.' },
  { id: 10, nome: 'Superlight 2', categoria: 'acessorios', preco: 699.00, precoAntigo: 899.00, parcelas: 2,
    foto: 'acessorios/Superlight 2.jpg', emoji: '🖱️', destaque: true,
    descricao: 'Sensor de alta precisão.' },
  { id: 11, nome: 'Teclado Magnetico Aula Win68', categoria: 'acessorios', preco: 289.90, parcelas: 3,
    foto: 'acessorios/Aula Win68.jpg', emoji: '⌨️', destaque: true,
    descricao: 'Switches magneticos responsivos e teclas com iluminação.' },
  { id: 12, nome: 'Carregador Turbo 65W', categoria: 'acessorios', preco: 129.90, parcelas: 2,
    foto: 'acessorios/carregador turbo.jpg', emoji: '🔌', destaque: false,
    descricao: 'Carrega celular e notebook com uma única fonte.' },
  { id: 13, nome: 'Webcam Logtech C920s', categoria: 'acessorios', preco: 347.31, parcelas: 3,
    foto: 'acessorios/webcam.jpg', emoji: '📷', destaque: false,
    descricao: 'Imagem nítida para aulas e reuniões, Microfone Embutido, Proteção de Privacidade, Widescreen 1080p e Conexão USB.' },
  { id: 14, nome: 'Galaxy fit3', categoria: 'acessorios', preco: 702.05, parcelas: 4,
    foto: 'acessorios/Galaxy fit3.jpg', emoji: '⌚', destaque: false,
    descricao: 'Monitora passos, sono e batimentos.' },
  { id: 15, nome: 'Monitor LG UltraGear 24 Pol.', categoria: 'monitores', preco: 749.90, precoAntigo: 949.90, parcelas: 6,
    foto: 'monitores/Monitor LG UltraGear.jpg', emoji: '🖥️', destaque: true,
    descricao: 'Painel IPS com cores fiéis e bordas finas.' },
  { id: 16, nome: 'Monitor Gamer Curvo Samsung Odyssey 34 Pol.', categoria: 'monitores', preco: 1399.90, parcelas: 10,
    foto: 'monitores/Samsung Odyssey 34.jpg', emoji: '🖥️', destaque: false,
    descricao: 'Tela curva de 165 Hz para jogar com imersão.' },
  { id: 17, nome: 'Smart Tv 50 4k Crystal Hdr Alexa Xbox Gaming Samsung + Nf', categoria: 'monitores', preco: 2499.90, precoAntigo: 2999.90, parcelas: 10,
    foto: 'monitores/Smart Tv 50 4k.jpg', emoji: '📺', destaque: true,
    descricao: 'Resolução 4K com os principais aplicativos de streaming.' },
  { id: 18, nome: 'Console PlayStation5', categoria: 'games', preco: 3999.90, parcelas: 10,
    foto: 'games/ps5.jpg', emoji: '🎮', destaque: false,
    descricao: 'Jogos em 4K com SSD ultrarrápido.' },
  { id: 19, nome: 'Cadeira Gamer Fox Racer Nordic Rgb Preta B98', categoria: 'games', preco: 413.71, parcelas: 10,
    foto: 'games/cadeira gamer.jpg', emoji: '🪑', destaque: false,
    descricao: 'Encosto reclinável e apoio lombar ajustável.' },
  { id: 20, nome: 'Iphone 17 Pro Max 256 GB', categoria: 'celulares', preco: 8399.00, precoAntigo: 9399.00, parcelas: 10,
    foto: 'celulares/17 Pro Max.jpg', emoji: '📱', destaque: true,
    descricao: 'Tela de 6,7", câmera tripla e 256 GB de espaço.' }
];

/* ---------- Funções compartilhadas ---------- */
const reais = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const foto = p => `<img src="../assets/img/produtos/${p.foto}" alt="${esc(p.nome)}" data-emoji="${p.emoji || '📦'}" loading="lazy">`;

// Se a foto ainda não existir, troca a imagem quebrada pelo emoji.
document.addEventListener('error', e => {
  const i = e.target;
  if (i.tagName === 'IMG' && i.closest('.img')) {
    const s = document.createElement('span');
    s.textContent = i.dataset.emoji; s.setAttribute('aria-hidden', 'true');
    i.replaceWith(s);
  }
}, true);

const desconto = p => p.precoAntigo ? Math.round((1 - p.preco / p.precoAntigo) * 100) : 0;

const cardProduto = p => `
  <article class="card produto">
    <div class="img">${desconto(p) ? `<span class="selo">-${desconto(p)}%</span>` : ''}${foto(p)}</div>
    <h3>${esc(p.nome)}</h3>
    ${p.precoAntigo ? `<p class="de">De <s>${reais(p.precoAntigo)}</s></p>` : ''}
    <p class="preco">${reais(p.preco)} <small>em ${p.parcelas}x de ${reais(p.preco / p.parcelas)}</small></p>
    <a class="btn btn-line" href="../produto/?id=${p.id}">Ver produto</a>
    <button class="btn" data-add="${p.id}">Adicionar ao carrinho</button>
  </article>`;

/* Carrinho guardado no localStorage: { idDoProduto: quantidade } */
const lerCarrinho = () => { try { return JSON.parse(localStorage.getItem('carrinho')) || {}; } catch { return {}; } };
const salvarCarrinho = c => { localStorage.setItem('carrinho', JSON.stringify(c)); if (window.atualizarCarrinho) window.atualizarCarrinho(); };

document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]'); if (!b) return;
  const c = lerCarrinho(); c[b.dataset.add] = (c[b.dataset.add] || 0) + 1; salvarCarrinho(c);
  const antes = b.textContent; b.textContent = 'Adicionado ✓';
  setTimeout(() => (b.textContent = antes), 1500);
});

/* Abas de categoria geradas a partir de CATEGORIAS */
function montarAbas(el, aoMudar, ativa = 'todos') {
  const cats = [['todos', 'Todos'], ...Object.entries(CATEGORIAS)];
  el.innerHTML = cats.map(([k, n]) =>
    `<button role="tab" aria-selected="${k === ativa}" data-cat="${k}">${n}</button>`).join('');
  el.onclick = e => {
    const b = e.target.closest('[role=tab]'); if (!b) return;
    el.querySelectorAll('[role=tab]').forEach(x => x.setAttribute('aria-selected', x === b));
    aoMudar(b.dataset.cat);
  };
}
