const express = require('express');
const fs = require('fs');

const app = express();

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const students = lines.slice(1).filter((line) => line.trim() !== '');
      const fields = {};

      for (const line of students) {
        const student = line.split(',');
        const field = student[3];
        if (!fields[field]) fields[field] = [];
        fields[field].push(student[0]);
      }

      let output = `Number of students: ${students.length}`;
      for (const field of Object.keys(fields).sort()) {
        output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
      }

      resolve(output);
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.get('/students', async (req, res) => {
  try {
    const result = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${result}`);
  } catch (err) {
    res.send(`This is the list of our students\n${err.message}`);
  }
});

app.listen(1245);

module.exports = app;
