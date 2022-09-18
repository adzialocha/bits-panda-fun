import fs from 'fs';

import { KeyPair } from 'p2panda-js';

export function loadKeyPair(path = './privateKey.txt') {
  if (!fs.existsSync(path)) {
    const keyPair = new KeyPair();
    fs.writeFileSync(path, keyPair.privateKey(), 'utf8');
    return keyPair;
  }

  try {
    const privateKey = fs.readFileSync(path, 'utf8').replace('\n', '');
    return new KeyPair(privateKey);
  } catch (error) {
    throw new Error(`Could not load private key from ${path}`);
  }
}
