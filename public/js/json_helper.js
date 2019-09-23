/* variables. */
var fs = require('fs');

/*
 * Read JSON from JSON file.
 *
 * @param json_file_name
 * @return json
 */
module.exports.readJson = function(json_file_name)
{
  // variables.
  var json;

  try
  {
    // read json from file.
    json = fs.readFileSync(json_file_name);

    // return json.
    return json;
  }
  catch (exception)
  {
    // write error messages to console.
    console.log("ERROR: Reading ducks file failed!");
    console.log("ERROR: " + exception);

    // return undefined.
    return undefined;
  }
};

/*
 * Read objects from JSON file.
 *
 * @param json_file_name
 * @return data
 */
module.exports.readObjects = function(json_file_name)
{
  // variables.
  var json;
  var data;

  try
  {
    // read json from file.
    json = fs.readFileSync(json_file_name);

    // parse JSON.
    data = JSON.parse(json);

    // return data.
    return data;
  }
  catch (exception)
  {
    // write error messages to console.
    console.log("ERROR: Reading ducks file failed!");
    console.log("ERROR: " + exception);

    // return undefined.
    return undefined;
  }
};

/*
 * Write objects to JSON file.
 *
 * @param data
 * @param json_file_name
 * @return json
 *
 */
module.exports.writeObjects = function(data, json_file_name)
{
  // variables.
  var json;

  try
  {
    // write data to file.
    fs.writeFileSync(json_file_name, JSON.stringify(data, null, 4));

    // read json from file.
    json = fs.readFileSync(json_file_name);

    // prase JSON.
    data = JSON.parse(json);

    // return updated data.
    return data;
  }
  catch (exception)
  {
    // write error messages to console.
    console.log("ERROR: Writing ducks file failed!");
    console.log("ERROR: " + exception);

    // return undefined.
    return undefined;
  }
};

/*
 * Write JSON to JSON file.
 *
 * @param json
 * @param json_file_name
 * @return json
 *
 */
module.exports.writeJson = function(json, json_file_name)
{
  try
  {
    // write data to file.
    fs.writeFileSync(json_file_name, data);

    // read json from file.
    json = fs.readFileSync(json_file_name);

    // return updated json.
    return json;
  }
  catch (exception)
  {
    // write error messages to console.
    console.log("ERROR: Writing ducks file failed!");
    console.log("ERROR: " + exception);

    // return undefined.
    return undefined;
  }
};
