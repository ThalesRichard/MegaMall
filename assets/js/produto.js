/* Detalhe de um produto: ../produto/?id=3 */
const p = PRODUTOS.find(x => x.id === Number(new URLSearchParams(location.search).get('id')));
document.getElementById('detalhe').innerHTML = p ? `
  <div class="detalhe">
    <div class="img">${foto(p)}</div>
    <div>
      <h1>${esc(p.nome)}</h1>
      <p>${esc(p.descricao)}</p>
      <p class="preco">${reais(p.preco)}</p>
      <p>ou ${p.parcelas}x de ${reais(p.preco / p.parcelas)} sem juros</p>
      <button class="btn" data-add="${p.id}">Adicionar ao carrinho</button>
      <p><a href="../carrinho/">Ir para o carrinho</a> · <a href="../produtos/">Voltar aos produtos</a></p>
    </div>
  </div>` : '<h1>Produto não encontrado</h1><p><a href="../produtos/">Ver todos os produtos</a></p>';
