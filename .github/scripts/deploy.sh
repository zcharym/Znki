function deploy() {
  if [ ! "$(docker ps -q -f name=znki)" ]; then
  docker restart znki
  if [ "$(docker ps -aq -f status=exited -f name=znki)" ]; then
      # cleanup
      echo "removing znki container"
      docker rm znki
  fi
  # run your container
  echo "running znki"
  docker run \
    -d --name znki -p 3000:3000 \
    -e NODE_ENV=production \
    -v /home/REMOTE_USER:/app node \
    bash -c "cd /app;npm install && node main.js"
  fi
}

deploy;
