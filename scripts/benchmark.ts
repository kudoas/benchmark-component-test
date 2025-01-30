import { exec } from "node:child_process";
import { performance } from "node:perf_hooks";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const runScript = async (script: string, label: string) => {
  const start = performance.now();

  try {
    const { stdout, stderr } = await execAsync(script);
    if (stdout) {
      console.log(`(${label}):\n${stdout}`);
    }
    if (stderr) {
      console.error(`[Error](${label}):\n${stderr}`);
    }
  } catch (error) {
    console.error(`[Error](${label}):\n${error}`);
  }

  const end = performance.now();
  const duration = (end - start) / 1000;
  return { name: label, duration: `${duration.toFixed(2)}s` };
};

const main = async () => {
  const scripts = [
    { script: "pnpm run test:karma --watch=false", label: "karma" },
  ];

  const isParallel = process.argv.includes("--parallel");

  if (isParallel) {
    const results = await Promise.all(
      scripts.map(({ script, label }) => runScript(script, label)),
    );
    console.table(results);
  } else {
    const results: { name: string; duration: string }[] = [];
    for (const { script, label } of scripts) {
      const result = await runScript(script, label);
      results.push(result);
    }
    console.table(results);
  }
};

main();
