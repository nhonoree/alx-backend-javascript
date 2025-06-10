const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

/**
 * Function to count students from a CSV file.
 * @param {string} path - Path to the CSV file.
 * @returns {Promise<string>} - A Promise that resolves with formatted student data.
 */
function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      if (lines.length <= 1) {
        resolve('This is the list of our students\n');
        return;
      }

      const header = lines[0].split(',');
      const fieldIndex = header.indexOf('field');
      const firstnameIndex = header.indexOf('firstname');

      const students = {};
      const totalStudents = [];

      for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        if (row.length === header.length) {
          const field = row[fieldIndex];
          const firstname = row[firstnameIndex];
          if (!students[field]) {
            students[field] = [];
          }
          students[field].push(firstname);
          totalStudents.push(firstname);
        }
      }

      let output = 'This is the list of our students\n';
      output += `Number of students: ${totalStudents.length}\n`;

      for (const [field, names] of Object.entries(students)) {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      }

      resolve(output.trim());
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.get('/students', (req, res) => {
  const databasePath = process.argv[2];
  countStudents(databasePath)
    .then((data) => {
      res.set('Content-Type', 'text/plain');
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;
