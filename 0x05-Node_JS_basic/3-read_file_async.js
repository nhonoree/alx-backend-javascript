const fs = require('fs');

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

      console.log(`Number of students: ${total}`);
      for (const [field, names] of Object.entries(students)) {
        console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
      }
      resolve();
    });
  });
}

module.exports = countStudents;
