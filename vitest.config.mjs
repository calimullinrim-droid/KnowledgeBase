import codspeedPlugin from '@codspeed/vitest-plugin';
import { defineConfig } from 'vitest/config';

// Resolve dependencies (e.g. micromark) to their production builds, as
// `pnpm lint:md` does, instead of the assertion-heavy "development" builds.
process.env.NODE_ENV = 'production';

export default defineConfig({
    plugins: [codspeedPlugin()],
    test: {
        // Benchmarks run much slower under CodSpeed's CPU simulation.
        testTimeout: 600_000,
        benchmark: {
            include: ['bench/**/*.bench.mjs'],
        },
    },
});
