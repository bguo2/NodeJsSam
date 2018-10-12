
var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var dbconfig = require("../db/config");

/* GET endpoint protection result. */
router.post('/', function(req, res) {
  var payload = req.body;
  
  var sql = "CALL GetAvailableEPs(?,?,?,?,?,?, @totalCount); select @totalCount as totalCount";
  try
  {
    var connection = mysql.createConnection(dbconfig);
    connection.connect();
    connection.query(sql, [payload.accountId, payload.supportAccountId, payload.pageOffset, payload.pageCount, payload.searchField, payload.searchValue], 
        function(errors, results, fields) {
          if (errors) {
              console.log(errors);
              res.status(500).send(errors);
          }
          else {
            var result = {totalCount: results[2][0].totalCount, eps: results[0]}
            res.send(result);
          }
    });
    connection.end();  
  }
  catch(e)
  {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
