# Poetry Transreader

Poetry reader... and translator! Monorepo containing client (NextJs) and server (ExpressJs) applications.

Serverside implementation uses a mashup of APIs:
- https://poetrydb.org, for retrieving poem data
- Google Cloud Translate, for translating poems
- Google Cloud Text-to-Speech, for reading the poems aloud

## Running Locally

If you have not setup a GCP project and authenticated your machine with `gcloud` util, please follow the steps outlined in the _Deployment_ section.

Create an `.env.local` file inside the `client/` folder, and add `API_BASE_URL` as a variable like so:

```.env
# Insert your machine's IP here, with port 5000
API_BASE_URL=http://192.168.0.0:5000
```

Create an `.env.local` file inside the `server/` folder, and add `PROJECT_ID` as a variable like so:

```.env
# Change to your GCP Project ID
PROJECT_ID=poem-trans-reader
```

Run the client and server:

```sh
docker-compose build
docker-compose up
```

## Deploying

The client and server for this application have been deployed to an AWS EC2 instance. Follow these instructions to achieve the same result.

### Prerequisites

This application uses Google Cloud Platform's Text-to-Speech and Translate APIs - make sure you have created a GCP project with these APIs enabled.

_SSH into your EC2 instance to perform the following commands._

Install and setup `gcloud`, and sign in with default credentials:

```sh
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

sudo apt-get install apt-transport-https ca-certificates gnupg

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

sudo apt-get update && sudo apt-get install google-cloud-sdk

gcloud init

# Sign-in with the Google account that houses your GCP project
gcloud auth application-default login
```

Install `docker`:

```sh
sudo apt install docker.io
```

### Running the Images

Pull the docker images for the client and server, and run them!

```sh
sudo docker login

sudo docker pull znicoll/transreader-server:latest

sudo docker pull znicoll/transreader-client:latest

# Need to mount the gcloud config directory into the docker container so that the API can authenticate with Google Cloud
sudo docker run -d -it --mount type=bind,source=$HOME/.config/gcloud,target=/root/.config/gcloud -p 5000:5000 --name SERVER znicoll/transreader-server

# Insert the API URL based on the current instance's public IP - this will change every time another EC2 is spun up, for example
sudo docker run -d -it -p 3000:3000 --name CLIENT --env API_BASE_URL="http://<instance_public_ip>:5000" znicoll/transreader-client

```