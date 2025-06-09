const http = require('http');
const fs = require('fs');

const database = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter(Boolean).slice(1);
      const students = {};
      let total = 0;

      lines.forEach((line) => {
        const [first, , , field] = line.split(',');
        if (!students[field]) students[field] = [];
        students[field].push(first);
        total += 1;
      });

      let output = `Number of students: ${total}\n`;
      for (const [field, names] of Object.entries(students)) {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }

      resolve(output.trim());
    });
  });
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Hello ALX!');
  } else if (req.url === '/students') {
    countStudents(database)
      .then((data) => {
        res.setHeader('Content-Type', 'text/plain');
        res.end(`This is the list of our students\n${data}`);
      })
      .catch(() => {
        res.statusCode = 500;
        res.end('Cannot load the database');
      });
  }
});

app.listen(1245);

module.exports = app;
