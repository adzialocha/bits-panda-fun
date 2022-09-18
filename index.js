import chalk from 'chalk';
import prompts from 'prompts';
import { Command } from 'commander';

import { loadKeyPair } from './keyPair.mjs';

// ~~~~~~~~~~~~~~~~~~
// Get user arguments
// ~~~~~~~~~~~~~~~~~~

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

// ~~~~~~~~~~~~~~~~~~~~
// Initialise variables
// ~~~~~~~~~~~~~~~~~~~~

const keyPair = loadKeyPair(options.privateKey);

// ~~~~~~~~~~~~~~~~
// Define all views
// ~~~~~~~~~~~~~~~~

function printTitle(title) {
  const line = title
    .split('')
    .reduce((acc, _, index) => {
      acc.push(index % 2 === 0 ? '☡' : ' ');
      return acc;
    }, [])
    .join('');

  console.log();
  console.log(chalk.bgMagenta.black(line));
  console.log(chalk.bgMagenta.black(title));
  console.log(chalk.bgMagenta.black(line));
  console.log();
}

async function showAll() {
  printTitle('Show all documents');
  console.log('Hello! There is nothing to see yet ..!');
  showNavigation();
}

async function showNavigation() {
  printTitle('Navigation');

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
      {
        title: 'Exit',
        value: 'exit',
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
  } else if (selection === 'exit') {
    printTitle('Good bye!');
  }
}

// ~~~~~~~
// Run it!
// ~~~~~~~

console.log(`
⠀⠀⠀⠀⠀⢀⣴⣶⣦⡄⢀⣀⣀⣀⣀⣀⢀⣴⣶⣦⣄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠉⠛⢿⣿⣿⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠙⠿⠁⠀⣠⣤⡄⠀⠀⢠⣤⣄⠀⠈⢿⠟⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠇⠀⢸⣿⣿⠳⣶⣶⡞⢿⣿⡇⢠⣼⢶⢶⣤⡀⠀⠀
⠀⠀⢀⣾⣿⣿⣿⣦⠈⠛⠋⠐⠤⠣⠀⠘⠛⠁⢿⡽⠛⠛⣼⡇⠀⠀
⠉⠉⠙⠿⢿⣿⡿⠟⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉

${chalk.bold('Public Key')}: ${chalk.blue(keyPair.publicKey())}`);

showAll();
