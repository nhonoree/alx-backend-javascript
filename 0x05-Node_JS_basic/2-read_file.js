const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
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
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
