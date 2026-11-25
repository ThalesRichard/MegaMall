const box = document.getElementById('carrinho');
function desenhar() {
  const c = lerCarrinho();
  const itens = Object.entries(c).map(([id, q]) => ({ p: PRODUTOS.find(x => x.id == id), q })).filter(i => i.p && i.q > 0);
  if (!itens.length) { box.innerHTML = '<p>Seu carrinho está vazio.</p><a class="btn" href="../produtos/">Ver produtos</a>'; return; }
  const total = itens.reduce((s, i) => s + i.p.preco * i.q, 0);
  box.innerHTML = itens.map(({ p, q }) => `
    <div class="card item">
      <div><h3>${esc(p.nome)}</h3><p>${reais(p.preco)} cada</p></div>
      <div class="qtd">
        <button class="btn btn-line" data-delta="-1" data-id="${p.id}" aria-label="Diminuir quantidade de ${esc(p.nome)}">−</button>
        <span>${q}</span>
        <button class="btn btn-line" data-delta="1" data-id="${p.id}" aria-label="Aumentar quantidade de ${esc(p.nome)}">+</button>
        <button class="btn btn-line" data-rem="${p.id}">Remover</button>
      </div>
    </div>`).join('') +
    `<p class="preco">Total: ${reais(total)}</p><button class="btn" id="fin">Finalizar compra</button>`;
}
box.addEventListener('click', e => {
  const c = lerCarrinho(), b = e.target.closest('button'); if (!b) return;
  if (b.dataset.delta) { c[b.dataset.id] = Math.max(0, (c[b.dataset.id] || 0) + Number(b.dataset.delta)); }
  else if (b.dataset.rem) { delete c[b.dataset.rem]; }
  else if (b.id === 'fin') { localStorage.removeItem('carrinho'); if (window.atualizarCarrinho) window.atualizarCarrinho();}
  else return;
  salvarCarrinho(c); desenhar();
});
desenhar();
