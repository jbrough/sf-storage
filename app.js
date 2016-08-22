const express = require('express');
const concat = require('concat-stream');

module.exports = (apis) => {
  const storage = require('./storage')(apis);
  const app = express();

	app.use(function(request, response, next){
		request.pipe(concat(function(data){
			request.body = data;
			next();
		}));
	});

  app.post('/:id', (req, res) => {
    storage(req.params.id).put(req.body, (err, location) => {
      if (err) {
        console.log(err);

        return res.status(500).end();
      }

      res.setHeader('Location', location);
      res.status(201).end();
    });
  });

  return app;
};
