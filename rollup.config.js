async function getConfig() {
  const { defineConfig } = await import('rollup');
  const nodeResolve = await import('@rollup/plugin-node-resolve').then(m => m.default);
  const commonjs = await import('@rollup/plugin-commonjs').then(m => m.default);
  const externals = await import('rollup-plugin-node-externals').then(m => m.default);
  const json = await import('@rollup/plugin-json').then(m => m.default);
  const terser = await import('@rollup/plugin-terser').then(m => m.default);
  const typescript = await import('rollup-plugin-typescript2').then(m => m.default);

  return defineConfig([
    {
      input: {
        index: 'src/index.ts'
      },
      output: [
        {
          dir: 'dist',
          format: 'cjs'
        }
      ],
      plugins: [
        nodeResolve(),
        externals({
          devDeps: false,  // 可以识别 package.json 中的 devDependencies 依赖 当做外部依赖
        }),
        typescript(),
        json(),
        commonjs(),
        terser(),
      ]
    }
  ]);
}

export default getConfig();