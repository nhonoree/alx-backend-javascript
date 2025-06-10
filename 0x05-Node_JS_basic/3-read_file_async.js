const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    const students = lines.slice(1);
    const fields = {};

    students.forEach((line) => {
      const student = line.split(',');
      const field = student[3];
      if (!fields[field]) fields[field] = [];
      fields[field].push(student[0]);
    });

    console.log(`Number of students: ${students.length}`);
    for (const field in fields) {
      if (Object.hasOwnProperty.call(fields, field)) {
        console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
      }
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
