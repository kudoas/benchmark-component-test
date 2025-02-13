import { exec } from "node:child_process";
import { performance } from "node:perf_hooks";
import { promisify } from "node:util";

const execAsync = promisify(exec);

const runScript = async (script: string, label: string) => {
  const start = performance.now();
  console.log(`[Start](${label}) ${script}`);

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
  console.log(`[End](${label}) ${script}`);
  const duration = (end - start) / 1000;
  return { name: label, duration: `${duration.toFixed(2)}s` };
};

const main = async () => {
  const scripts = [
    { script: "pnpm run test:karma --watch=false", label: "karma+jasmine" },
    { script: "pnpm run test:wtr --watch=false", label: "wtr+jasmine" },
    { script: "pnpm run test:jest --watch=false", label: "jest" },
    // { script: "pnpm run test:jest2", label: "jest(official)" },
    { script: "pnpm run test:playwright", label: "vitest+playwright" },
    { script: "pnpm run test:webdriverio", label: "vitest+webdriverio" },
    { script: "pnpm run test:jsdom", label: "vitest+jsdom" },
  ];

  const isParallel = process.argv.includes("--parallel");

  const executeScripts = async (script: string, label: string) => {
    const first = await runScript(script, label);
    return { name: label, duration: first.duration };
  };

  if (isParallel) {
    const results = await Promise.all(
      scripts.map(({ script, label }) => executeScripts(script, label)),
    );
    console.table(results);
  } else {
    const results: { name: string; duration: string }[] = [];
    for (const { script, label } of scripts) {
      const result = await executeScripts(script, label);
      results.push(result);
    }
    console.table(results);
  }
};

main();
