const autocannon = require('autocannon');

async function runLoadTest() {
  const result = await autocannon({
    url: 'http://localhost:3000',
    connections: 10,
    pipelining: 1,
    duration: 10,
    headers: {
      'Content-Type': 'application/json'
    },
    requests: [
      {
        method: 'GET',
        path: '/'
      }
    ]
  });

  // Format output to match expected format
  console.log(`Running ${result.duration}s test @ ${result.url}`);
  console.log(`${result.connections} connections\n`);
  console.log('┌─────────┬───────┬───────┬───────┬───────┬──────────┬─────────┬────────┐');
  console.log('│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev   │ Min    │');
  console.log('├─────────┼───────┼───────┼───────┼───────┼──────────┼─────────┼────────┤');
  console.log(`│ Latency │ ${result.latency.p2_5}ms  │ ${result.latency.p50}ms  │ ${result.latency.p97_5}ms  │ ${result.latency.p99}ms  │ ${result.latency.average.toFixed(2)}ms  │ ${result.latency.stddev.toFixed(2)}ms │ ${result.latency.min}ms   │`);
  console.log('└─────────┴───────┴───────┴───────┴───────┴──────────┴─────────┴────────┘');
}

runLoadTest().catch(console.error);