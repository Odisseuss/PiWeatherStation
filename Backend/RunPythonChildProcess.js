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

let regex = /(\d+-\d+-\d+\D\d+:\d+:\d+)\D*(\d+)\D*(\d+)\D*(\d+)\D*(\d+)/;

let pythonShell = new PythonShell("TestPyScript.py", options);

setTimeout(() => {
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
}, 300000);

pythonShell.on("message", function (msg) {
  let regex_results = msg.match(regex);
  regex_results = regex_results.slice(1);
  AddToDb(...regex_results);
  console.log(
    `Timestamp: ${regex_results[0]}, Temperature: ${regex_results[1]}, Pressure: ${regex_results[2]}, Humidity: ${regex_results[3]}, Air Quality: ${regex_results[4]}`
  );
});

pythonShell.end(function (err) {
  if (err) throw err;
  console.log("finished");
});
