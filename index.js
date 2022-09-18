import chalk from 'chalk';
import prompts from 'prompts';
import { Command } from 'commander';

import { loadKeyPair } from './keyPair.mjs';

const program = new Command();

program
  .name('fun')
  .description('p2panda hacksession with bitspossessed')
  .option(
    '-k, --private-key <path>',
    'Path to file containing hex-encoded ed25519 private key',
    './privateKey.txt',
  );

program.parse();
const options = program.opts();

const keyPair = loadKeyPair(options.privateKey);

console.log(`
⠀⠀⠀⠀⠀⢀⣴⣶⣦⡄⢀⣀⣀⣀⣀⣀⢀⣴⣶⣦⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠉⠛⢿⣿⣿⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠙⠿⠁⠀⣠⣤⡄⠀⠀⢠⣤⣄⠀⠈⢿⠟⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠇⠀⢸⣿⣿⠳⣶⣶⡞⢿⣿⡇⢠⣼⢶⢶⣤⡀⠀⠀
⠀⠀⢀⣾⣿⣿⣿⣦⠈⠛⠋⠐⠤⠣⠀⠘⠛⠁⢿⡽⠛⠛⣼⡇⠀⠀
⠉⠉⠙⠿⢿⣿⡿⠟⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉

${chalk.bold('Public Key')}: ${chalk.blue(keyPair.publicKey())}
`);

async function showAll() {
  console.log('Hello! There is nothing to see yet ..!');
  showNavigation();
}

async function showNavigation() {
  console.log();

  const { selection } = await prompts({
    type: 'select',
    name: 'selection',
    message: 'What do you want to do next?',
    choices: [
      {
        title: 'Show',
        value: 'show',
      },
      {
        title: 'Create',
        value: 'create',
      },
      {
        title: 'Update',
        value: 'update',
      },
      {
        title: 'Delete',
        value: 'delete',
      },
    ],
  });

  if (selection === 'show') {
    showAll();
  } else if (selection === 'create') {
    // @TODO
  } else if (selection === 'update') {
    // @TODO
  } else if (selection === 'delete') {
    // @TODO
  }
}

showAll();
