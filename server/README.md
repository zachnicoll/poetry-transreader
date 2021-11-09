# Quickstart

Create an `.env.local` file and add `PROJECT_ID` as a variable like so:

```.env
# Change to your GCP Project ID
PROJECT_ID=poem-trans-reader
```

Then,

```bash
# The server interfaces with GCP, and requires the GOOGLE_APPLICATION_CREDENTIALS env var to be set
gcloud auth application-default login

yarn install

yarn dev
```

### Production

Use `yarn start` to run this server in 'production' (non-dev mode).
