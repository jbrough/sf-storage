module.exports = () => {
  const projectId = process.env.GOOGLE_PROJECT_ID;
  const credentials = JSON.parse(process.env.GOOGLE_CREDS);

  gcloud = require('gcloud')({ projectId, credentials });

  return {
    gcs: gcloud.storage(),
  };
};
