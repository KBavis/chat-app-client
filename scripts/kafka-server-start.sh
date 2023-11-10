#Script Start
echo "Kafka Server script start"

#Change to correct directory
cd ../../Kafka/kafka/

#Starting Server
echo "Starting Kafka Server..."

#Start Kafka Server
./bin/windows/kafka-server-start.bat ./config/server.properties

#Server Started
echo "Kafka Server Started"
