Chit-Chat (React Frontend) 

The purpose of this application is to display a proper UI for our Chit-Chat application. This application works in conjunction with Chit-Chat's REST API (https://github.com/KBavis/chat-app-api.git) to allow users to register accounts, generate conversations with other users, and then chat with one and other. The frontend utilizes React in order to generate the necessary componenents needed to display our UI and to manage the relatively striaight forward state needed more a session. In order to manage our application's state and pass data through a React component tree, our React Frontend utilizes React Context API. This allows for our application to effectively manage our global state management and avoid prop drilling, while also optimizing our performance. 

Working with the Front-end has never been necesarily my 'area of expertise'. It's an area that has always interested me and so I figured (as with everything software engineering related), the best way to learn is to go and build something! With that being said, I faced a hefty amount of challeneges throughout my Front-End development work (including some issues that are still present). 1) Managing State Effectively. This was my first take on utilizing React's Context API after reading a bit into the best way to apply the practice to an application. I initally attempted to break this state down by Entity, but realized quickly there would be some issues along the way. On top of this, I ran into some issues handling state when a user was 'recieving a message'. All messages are stored within a Postgres Database, however, I wanted to implement "real-time functionality" utilziing web-sockets. This proved to be a bit of challenge when it came to displaying the recieved message sent over the web-sockets since the user must essentially be listening on all web-sockets, and then the recieved message needs to properly be assinged to proper Conversation and appear instantly. 2) Memory Management. This was an area that I haven't dealt with too much in the past, but allowed me to dive into some of inner-working of memory and how to manage it in the best way possible. The issue was that I initally had my Front-End and Back-End running on the same EC2 Instnace. This ended up exhausting the memory allocated by the EC2 instnance and causing the application to crash. I worked around this issue by simply creating a seperate EC2 Instance for my front-end, which resolved the problem (well, temporarily --- see 'TO-DO' Section Below).


In order to install the application and run the project, please do the following:

-----------BACKEND SETUP--------------

1) Clone The API repoistory (https://github.com/KBavis/chat-app-api.git) to your local machine.

2) Update your local copy of the API as follows :
	- Create an application.properties (see the template application.propeties file for example set-up)
	- Run 'mvn clean install -DskipTests' to generate the .jar file needed 

3) Build your API Docker Image 
	- Ensure that the 'Dockerfile' is referencing the correct location of your .jar file and the proper name 
	- Run the command 'docker build -t api-image:latest .' while in the working directy of your Docker Image and Target Directory (where your .jar should be located)

4) Update Your Docker Compose File
	- Update KAFKA_ZOOKEEPER_CONNECT host domain (this should be the IPV4 Address of the 'bridge' network --> run 'docker inspect network bridge' to determine
	- Update KAFKA_ADVERTISED_LISTENERS host domain (if running locally, this should be localhost)

5) Run Docker-Compose File
	- Execute the command 'docker-compose up -d' in the working directory of your docker-compose.yml file 

----------FRONTEND SETUP---------------

1) Clone the Frontend Repository (https://github.com/KBavis/chat-app-client.git) to your local machine.

2) Update conifg.js host domain to be 'localhost'

3) If attempting to run locally, there is no need to utilize the dokcer-compose.yml file (as this serves as a reverse proxy for our EC2 Instance), so simply build your docker image via the following commnad:
	- docker build -t client-image:latest . 

4) Run the docker image :
	'docker run -p 3000:3000 client-image:latest'

5) Access the login page by going to http://localhost:3000 


TO-DO
The functionality of the project has been able to do as I wanted, but there are some points that I want to consider for the future if I revisit this project.
	1) Responsive Design - as of now, this application was created to simply serve as a web application. In the futurre, I would love for this application to be accessible via a phone. This shouldn't be much of change 		needed due to the ease of use by tailwind with their breakpoints. 

	2) Memory Allocation on EC2 Instance. I have the application not currently running on the EC2 Instance as a result of memory problems. The amount of memory on the free-tier of the EC2 Instance is limted, and as a 		result, the resources become exhausted after a couple hours of up-time. This fix is simply just to migrate to a larger version of an EC2 Instnace, but due to this project being more for learning purposes, I don	     't see the need to break the bank to just always keep the application running. I was able to confirm that when the application does run, users are able to create accounts, create group conversation or one-on-on		  e conversations, and then have a seemless chat experience with real-time functionality. This was the main reason I wanted to deploy the application in first place!

	3) HTTPS Configuration. As of now, the application is confiugred to run on HTTP, but, to have SSL, this should be on HTTPS. I honestly think this change is extremely straight forward (i.e change the Caddy file fro		m running on Port 80 to running on Port 443. I may get to this sooner rather than later (for learning purposes), so this may be disregarded if fixed.

	4) Real-Time Functionality. When a conversation is initally created, there is a small buffer peroid that must be waited for while the web-socket connection is attempting to be established. During this peroid, user		are unable to utilize the real-time functionality that works once it's been established. Due to this, I want to create a loading screen until its been establish, ensuring no messages are sent.

	5) Styling. The icon on the tab is still the original React icon. This should be udpatd to be some Chit-Chat logo. On top of this, when a user recieves a message from another user that doesn't have a profile image		, the image will just say the alternate to profile image "profileImage". Instead, this should display the default user icon.


