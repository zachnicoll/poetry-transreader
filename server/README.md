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

## Endpoints

_Don't forget the trailing slash!_

- `GET /title/:searchTerm` Returns a list of poems with a title containing `searchTerm` 
- `GET /author/:authorName/` Returns a list of poems with an author containing `authorName`
- `GET /random/:numRandom/` Returns a list of `numRandom` random poems
- `GET /translate/` Returns a list of languages supported by Google Cloud Translate
- `POST /translate/` Translates the provided text into the desired language, and returns the translated text
- `POST /speak/` Converts the supplied text to synthesised speach via Google Cloud Text-to-Speech, and returns the audio blob in WAV format