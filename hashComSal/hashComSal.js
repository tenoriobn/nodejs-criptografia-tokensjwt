import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

function criaHashComSal(senha) {
  const sal = randomBytes(16).toString('hex');
  const senhaHasheada = scryptSync(senha, sal, 64).toString('hex');

  return `${sal}:${senhaHasheada}`;
}

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    [this.sal, this.hash] = criaHashComSal(senha).split(':');
  }

  autentica(nome, senha) {
    if (nome === this.nome) {
      const testeHash = scryptSync(senha, this.sal, 64);
      console.log('testeHash: ', testeHash)

      const hashReal = Buffer.from(this.hash, 'hex');
      console.log('hashReal: ', hashReal);

      const hashesCorrespondem = timingSafeEqual(testeHash, hashReal)

      if (hashesCorrespondem) {
        console.log("Usuário autenticado com sucesso!");
        return true;
      }
    }

    console.log("Usuário ou senha incorretos.");
    return false;
  }
}

const jm = new Usuario('Joao Manoel', 'senhaSecreta');
console.log('jm: ', jm);

// Teste de sucesso
jm.autentica('Joao Manoel', 'senhaSecreta');

// Teste de insucesso
jm.autentica('Jm', 'senhaSecreta');
jm.autentica('Joao Manoel', 'senhasecreta');