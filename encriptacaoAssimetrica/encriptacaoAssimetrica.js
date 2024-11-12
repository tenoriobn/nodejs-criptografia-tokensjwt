import { generateKeyPairSync } from "crypto";

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
})

// console.log('publicKey ', publicKey)
// console.log('privateKey: ', privateKey)

import { publicEncrypt, privateDecrypt } from "crypto";

const dadosCriptografados = publicEncrypt(publicKey, Buffer.from("Mensagem super secreta"));

console.log('dadosCriptografados: ', dadosCriptografados)

// ------ Transmisão --------

const dadosDecifrados = privateDecrypt(privateKey, dadosCriptografados);
console.log('dadosCriptografados: ',  dadosDecifrados.toString('utf-8'));