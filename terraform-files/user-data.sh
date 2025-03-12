#! /bin/sh
yum update -y

amazon-linux-extras install docker -y

service docker start

usermod -a -G docker ec2-user

chkconfig docker on

# Pull the game Docker image
docker pull adeshkedlaya2003/game

# Run the container on port 80
docker run -d -p 80:80 --name game-container adeshkedlaya2003/game
