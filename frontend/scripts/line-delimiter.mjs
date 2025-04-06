import {readFile, writeFile, readdir, access} from 'fs/promises';

const SNAPSHOT_DIRECTORY = 'test/snapshot/static-snapshots/aria/';
const ARGUMENT_TACTIC = 'tactic';
const FILE_ENCODING = 'utf8';

main();

async function main() {
    try {
        await access(SNAPSHOT_DIRECTORY);
        try {
            const [origValue, valueToReplace, tactic] = getReplaceValues();
            const snapshots = await readdir(SNAPSHOT_DIRECTORY);
            for (const i in snapshots) {
                const snapshotFile = await readInputFile(snapshots[i]);
                await writeInputFile(snapshots[i], snapshotFile.replaceAll(origValue, valueToReplace));
            }
            // eslint-disable-next-line no-console
            console.log(`Snapshot line separators have been changed using ${tactic} approach.`);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`The directory '${SNAPSHOT_DIRECTORY}' does not exist, function ended with no changing.`);
    }
}

async function readInputFile(fileName) {
    return readFile(createFileName(fileName), {encoding: FILE_ENCODING});
}

async function writeInputFile(fileName, content) {
    return writeFile(createFileName(fileName), content, {encoding: FILE_ENCODING});
}

function createFileName(fileName) {
    return `${SNAPSHOT_DIRECTORY}${fileName}`;
}

function getReplaceValues() {
    const tactic = calculateTactic();

    switch (tactic) {
        // Before snapshot content comparison
        case 'git-to-windows':
            return [/\r\n/g, '\n', tactic];
        // After snapshot content comparison
        case 'windows-to-git':
            return [/(?<!\r)\n/g, '\r\n', tactic];
        default:
            throw Error(`Undefined tactic type: ${tactic}`);
    }
}

function calculateTactic() {
    const args = process.argv.slice(2)[0].replace('--', '').split('=');
    if (args[0] === ARGUMENT_TACTIC) {
        return args[1];
    }

    throw Error(`${ARGUMENT_TACTIC} arg not found`);
}
