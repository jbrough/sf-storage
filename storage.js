module.exports = (apis) => {
  const bucket = process.env.GS_BUCKET;

  return function storage(id) {
		const name = `${id}.jpg`;
    const file = apis.gcs.bucket(bucket).file(name);

    function newErr(method, err) {
      const msg = `GCS Error: ${method} ${bucket}/${name}`;
      return new Error(`${msg} ${err}`);
    }

		return {
      put: (data, cb) => {
        const metadata = {
          contentType: 'image/jpeg',
        };

        const writer = file.createWriteStream(
          { metadata: metadata }
        )
          .on('error', (err) => {
            console.log(JSON.stringify(err));
            cb(err);
          })
          .on('finish', () => {
            file.makePublic((err, res) => {
              const location = `https://storage.googleapis.com/${bucket}/${name}`;
              cb(err, location);
            });
          });
        writer.write(data);
        writer.end();
      },
		};
  };
};
