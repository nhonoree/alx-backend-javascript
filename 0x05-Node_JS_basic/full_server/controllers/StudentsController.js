import { readDatabase } from '../utils';

class StudentsController {
  static getAllStudents(req, res) {
    const path = process.argv[2];

    readDatabase(path)
      .then((fields) => {
        const lines = ['This is the list of our students'];
        const keys = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        for (const key of keys) {
          lines.push(`Number of students in ${key}: ${fields[key].length}. List: ${fields[key].join(', ')}`);
        }
        res.status(200).send(lines.join('\n'));
      })
      .catch((err) => res.status(500).send(err.message));
  }

  static getAllStudentsByMajor(req, res) {
    const path = process.argv[2];
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(path)
      .then((fields) => {
        if (fields[major]) {
          res.status(200).send(`List: ${fields[major].join(', ')}`);
        } else {
          res.status(200).send('List:');
        }
      })
      .catch((err) => res.status(500).send(err.message));
  }
}

export default StudentsController;
