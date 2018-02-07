import { exec } from 'child_process'

export function execute(cmd): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error || stderr)
      }

      resolve(stdout)
    })
  })
}

export function read(cmd) {
  return exec(cmd);
}
