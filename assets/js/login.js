/* Login SIMULADO: não há servidor, apenas valida os campos e guarda o nome no localStorage. */
document.getElementById('form-login').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('erro');
  if (!/^\S+@\S+\.\S+$/.test(email)) { erro.textContent = 'Digite um e-mail válido, como nome@exemplo.com.'; return; }
  if (senha.length < 6) { erro.textContent = 'A senha precisa ter pelo menos 6 caracteres.'; return; }
  localStorage.setItem('usuario', email.split('@')[0]);
  location.href = '../home/';
});
