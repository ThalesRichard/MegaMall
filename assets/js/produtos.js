/* Lista de produtos com busca (?q=) e filtro de categoria (?cat=) */
const params = new URLSearchParams(location.search);
const q = params.get('q') || '';
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const lista = document.getElementById('lista'), info = document.getElementById('info');
let cat = CATEGORIAS[params.get('cat')] ? params.get('cat') : 'todos';

function desenhar() {
  const r = PRODUTOS.filter(p => (cat === 'todos' || p.categoria === cat) &&
    norm(p.nome + ' ' + p.descricao).includes(norm(q)));
  info.textContent = `${r.length} produto(s) encontrado(s)` + (q ? ` para "${q}"` : '');
  lista.innerHTML = r.map(cardProduto).join('') ||
    '<p>Nenhum produto encontrado. Tente outra palavra ou veja todas as categorias.</p>';
}
montarAbas(document.getElementById('abas'), c => { cat = c; desenhar(); }, cat);
desenhar();
document.addEventListener('DOMContentLoaded', () => { document.getElementById('q').value = q; });
