# Quickstart

```sh
yarn install

yarn dev
```

### Production

Use `yarn start` to run this server in 'production' (non-dev mode).

# Deploying

The client and server for this application have been deployed to an AWS EC2 instance. Follow these instructions to achieve the same result.

## Prerequisites

_SSH into your EC2 instance to perform the following commands._

Install and setup `gcloud`, and sign in with default credentials:

```sh
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

sudo apt-get install apt-transport-https ca-certificates gnupg

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

sudo apt-get update && sudo apt-get install google-cloud-sdk

gcloud init

gcloud auth application-default login
```

Install `docker`:

```sh
sudo apt install docker.io
```

## Running the Images

Pull the docker images for the client and server, and run them!

```sh
sudo docker pull znicoll/transreader-server:latest

sudo docker pull znicoll/transreader-client:latest

# Need to mount the gcloud config directory into the docker container so that the API can authenticate with Google Cloud
sudo docker run -d -it --mount type=bind,source=$HOME/.config/gcloud,target=/root/.config/gcloud -p 5000:5000 --name SERVER znicoll/transreader-server

# Insert the API URL based on the current instance's public IP - this will change every time another EC2 is spun up, for example
sudo docker run -d -it -p 3000:3000 --name CLIENT --env API_BASE_URL="http://<instance_public_ip>:5000" znicoll/transreader-client

```
