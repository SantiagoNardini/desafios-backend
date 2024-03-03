import { Command } from "commander";

const program = new Command();

program
    .option('--mode <mode>', 'Especificacion del entorno', 'dev')
    .parse()

export default program