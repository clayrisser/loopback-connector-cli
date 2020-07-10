import crossSpawn from 'cross-spawn';

export default async function spawn(
  command: string,
  args: string[] = []
): Promise<string> {
  return new Promise((resolve, reject) => {
    const cp = crossSpawn(command, args);
    let message = '';
    if (cp.stdout)
      cp.stdout.on('data', (data: any) => (message += data.toString()));
    if (cp.stderr)
      cp.stderr.on('data', (data: any) => (message += data.toString()));
    cp.on('close', (code: number) => {
      if (code !== 0) return reject(new Error(message));
      return resolve(message);
    });
    cp.on('error', reject);
  });
}
