import fs from 'fs';

export function readDatabase(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n').filter((line) => line);
      const students = lines.slice(1);
      const fields = {};

      for (const line of students) {
        const student = line.split(',');
        const field = student[3];
        if (!fields[field]) fields[field] = [];
        fields[field].push(student[0]);
      }

      resolve(fields);
    });
  });
}
