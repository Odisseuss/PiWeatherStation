const { PythonShell } = require("python-shell");
const AddToDb = require("./AddDataToDb");

const options = {
  scriptPath: "./Backend/Python/",
  pythonOptions: ["-u"],
  args: [
    process.env.PG_HOST,
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    process.env.PG_PORT,
  ],
};

let pythonShell2 = new PythonShell("ComputeAverages.py", {
  scriptPath: "./Backend/Python/",
  pythonOptions: ["-u"],
  args: [
    process.env.PG_HOST,
    process.env.PG_DATABASE,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    process.env.PG_PORT,
  ],
});
