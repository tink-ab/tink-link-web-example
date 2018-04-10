FROM gcr.io/tink-containers/debian:stretch

# Environment variables needed for the app.
ENV CLIENT_SECRET="CLIENT_SECRET"

# For Node installation.
ENV NODE_NPM_SHASUM=467472d9adafd067588f2a20f9edcd7493d973fe107502c55d6fabfa0d3f91af
ENV NODE_VERSION=v6.13.0
ENV NODEJS_HOME=/usr/lib/nodejs/node-${NODE_VERSION}
ENV PATH=$NODEJS_HOME/bin:$PATH

# For gcloud installation.
ENV CLOUD_SDK_REPO="cloud-sdk-stretch"

# Install dependencies.
RUN apt-get update \
    && apt-get install --assume-yes curl gnupg \
    && echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
    && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - \
    && apt-get update && apt-get install --assume-yes google-cloud-sdk \
    && mkdir node-${NODE_VERSION} && cd node-${NODE_VERSION} \
    && curl https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.gz > node.tar.gz \
    && echo "${NODE_NPM_SHASUM}  node.tar.gz" > node_npm_SHA256SUM \
    && sha256sum --check --strict node_npm_SHA256SUM \
    && tar xzf node.tar.gz --strip-components=1 \
    && mkdir /usr/lib/nodejs \
    && cd .. && cp --recursive node-${NODE_VERSION} /usr/lib/nodejs
