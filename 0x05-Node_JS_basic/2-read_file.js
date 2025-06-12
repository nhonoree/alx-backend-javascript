const fs = require('fs');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path, 'utf8');
  } catch {
    throw new Error('Cannot load the database');
  }

  const lines = data.trim().split('\n').filter(l => l);
  const students = lines.slice(1);
  console.log(`Number of students: ${students.length}`);

  const byField = {};
  students.forEach((l) => {
    const [firstname, , , field] = l.split(',');
    byField[field] = byField[field] || [];
    byField[field].push(firstname);
  });

  Object.entries(byField).forEach(([field, names]) => {
    console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
  });
}

module.exports = countStudents;
