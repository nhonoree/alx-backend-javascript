export default function createIteratorObject(report) {
  const allEmployees = report.allEmployees;

  function* iterate() {
    for (const dept of Object.values(allEmployees)) {
      for (const employee of dept) {
        yield employee;
      }
    }
  }

  return iterate();
}

