process.stdout.write('Welcome to ALX, what is your name?\n');

process.stdin.on('data', (data) => {
  const name = data.toString().trim();
  process.stdout.write(`Your name is: ${name}\n`);
});

// When the input stream ends (e.g., piped input like echo "John" | node 1-stdin.js)
process.stdin.on('end', () => {
  console.log('This important software is now closing');
});
