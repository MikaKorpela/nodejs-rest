/* import modules. */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var json_helper = require('./public/js/json_helper');
var json_file_name = './public/json/ducks.json';

/* initialize http server. */
var app = express();
var port = process.env.PORT;

/* enable cors. */
app.use(cors());

/* enable body parser for json. */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Get all.
 * 
 * @param req
 * @param res
 */
app.get('/', function(req, res)
{
  // variables.
  var json;

  // read json.
  json = json_helper.readJson(json_file_name);

  // json content found.
  if (json != undefined)
  {
    // return ok (200).
    res.writeHead(200);
    
  }
  // json content not found.
  else
  {
    // return file not found (404).
    res.writeHead(404);
  }

  // return json.
  res.end(json);
});

/**
 * Get.
 * 
 * @param req
 * @param res
 * @returns item
 */
app.get('/:id', function(req, res)
{
  // variables.
  var items;
  var item_index;
  var item = undefined;

  // read items.
  var items = json_helper.readObjects(json_file_name);

  // items found.
  if (items != undefined)
  {
    // go through items.
    for (item_index = 0; item_index < items.length; item_index++)
    {
      // id matches.
      if (items[item_index].id == req.params.id)
      {
        // get item.
        item = items[item_index];
      }
    }

    // item found.
    if (item != undefined)
    {
      // return ok (200).
      res.writeHead(200);
    }
    // item not found.
    else
    {
      // return not found (404).
      res.writeHead(404);
    }
  }
  // items not found.
  else
  {
    // return not found (404).
    res.writeHead(404);
  }

  // return item.
  res.end(JSON.stringify(item, null, 4));
});

/**
 * Post.
 * 
 * @param req
 * @param res
 * @returns item
 */
app.post('/', function(req, res)
{
  // variables.
  var items;
  var item;
  var next_id;

  // get item from request.
  item = req.body;

  // item found.
  if (item != undefined)
  {
    // read items.
    var items = json_helper.readObjects(json_file_name);

    // items found.
    if (items != undefined)
    {
      // get next id.
      next_id = get_next_id(items);

      // next id found.
      if (next_id != undefined)
      {
        // set id to item.
        item.id = next_id;

        // add item.
        items.push(item);

        // write items.
        json_helper.writeObjects(items, json_file_name);

        // return created (201).
        res.writeHead(201);
      }
      // next id not found.
      else
      {
         // return not found (404).
         res.writeHead(404);
      }
    }
    // items not found.
    else
    {
      // return not found (404).
      res.writeHead(404);
    }
  }
  // item not found.
  else
  {
    // return bad request (400).
    res.writeHead(400);
  }

  // return item.
  res.end(JSON.stringify(item, null, 4));
});

/**
 * Put.
 * 
 * @param req
 * @param res
 * @returns item
 */
app.put('/:id', function(req, res)
{
  // variables.
  var items;
  var item;
  var item_index;
  var item_found = false;

  // get item from request.
  item = req.body;
  
  // read items.
  var items = json_helper.readObjects(json_file_name);

  // items found.
  if (items != undefined)
  {
    // go through items.
    for (item_index = 0; item_index < items.length; item_index++)
    {
      // id matches.
      if (items[item_index].id == req.params.id)
      {
        // replace item.
        items.splice(item_index, 1, item);

        // set status.
        item_found= true;
      }
    }

    // item found.
    if (item_found)
    {
      // write items.
      json_helper.writeObjects(items, json_file_name);

      // return ok (200).
      res.writeHead(200);
    }
    // item not found.
    else
    {
      // return not found (404).
      res.writeHead(404);
    }
  }
  // items not found.
  else
  {
    // return not found (404).
    res.writeHead(404);
  }

  // return item.
  res.end(JSON.stringify(item, null, 4));
});

/**
 * Delete.
 * 
 * @param req
 * @param res
 */
app.delete('/:id', function(req, res)
{
  // variables.
  var items;
  var item_index;
  var item_found = false;

  console.log(req.params.id);

  // read items.
  var items = json_helper.readObjects(json_file_name);

  // items found.
  if (items != undefined)
  {
    // go through items.
    for (item_index = 0; item_index < items.length; item_index++)
    {
      // id matches.
      if (items[item_index].id == req.params.id)
      {
        // remove item.
        items.splice(item_index, 1);

        // set status.
        item_found= true;
      }
    }

    // item found.
    if (item_found)
    {
      // write items.
      json_helper.writeObjects(items, json_file_name);

      // return no content (204).
      res.writeHead(204);
    }
    // item not found.
    else
    {
      // return not found (404).
      res.writeHead(404);
    }
  }
  // items not found.
  else
  {
    // return not found (404).
    res.writeHead(404);
  }

  // return empty.
  res.end(undefined);
});

/**
 * Get next id.
 * 
 * @param items
 * @return id
 */
function get_next_id(items)
{
  // variables.
  var next_id = 0;

  // go through items.
  for (item_index = 0; item_index < items.length; item_index++)
  {
    // has biggest id.
    if (items[item_index].id >= next_id)
    {
      // set next id.
      next_id = items[item_index].id + 1;
    }
  }

  // return next id.
  return next_id;
}

/* start http server. */
app.listen(port);
console.log('RESTFul API server started on: ' + port);
