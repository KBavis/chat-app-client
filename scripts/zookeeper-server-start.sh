
#Echo Script Start
echo "Zookeeper Server script started"

#Change directory to ../../Kafka/kafka/
cd ../../Kafka/kafka/

# Start Zookeeper
./bin/windows/zookeeper-server-start.bat ./config/zookeeper.properties

echo "Zookeeper Server is running."

