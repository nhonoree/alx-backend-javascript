const http = require('http');
const fs = require('fs');

const port = 1245;
const host = 'localhost';

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }
      const lines = data.trim().split('\n');
      const students = lines.slice(1);
      const fields = {};

      students.forEach((line) => {
        const student = line.split(',');
        const field = student[3];
        if (!fields[field]) fields[field] = [];
        fields[field].push(student[0]);
      });

      let output = `Number of students: ${students.length}`;
      for (const field in fields) {
        if (Object.hasOwnProperty.call(fields, field)) {
          output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        }
      }

      resolve(output);
    });
  });
}

const app = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');
    countStudents(process.argv[2])
      .then((data) => res.end(data))
      .catch((err) => res.end(err.message));
  }
});

app.listen(port, host);

module.exports = app;
