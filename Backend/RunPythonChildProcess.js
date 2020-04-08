const { PythonShell } = require("python-shell");
const AddToDb = require("./AddDataToDb");

const options = {
  scriptPath: "./Backend/Python/",
  pythonOptions: ["-u"],
};

let regex = /(\d+-\d+-\d+\D\d+:\d+:\d+)\D*(\d+)\D*(\d+)\D*(\d+)\D*(\d+)/;

let pythonShell = new PythonShell("TestPyScript.py", options);

pythonShell.on("message", function (msg) {
  let regex_results = msg.match(regex);
  regex_results = regex_results.slice(1);
  AddToDb(...regex_results);
  console.log(
    `Timestamp: ${regex_results[1]}, Temperature: ${regex_results[2]}, Pressure: ${regex_results[3]}, Humidity: ${regex_results[4]}, Air Quality: ${regex_results[5]}`
  );
});

pythonShell.end(function (err) {
  if (err) throw err;
  console.log("finished");
});
