

Title: The Problem With Vertical Bike Racks/ Why Vertical Bike Racks Suck!

Michael Carpenter, macarpe2@asu.edu, 1218487868

Kenneth Wang, khwang11@asu.edu, 1214869656

Avery Langton, ajlangto@asu.edu, 1217703175

Nupur Patel, ndpate11@asu.edu, 1218502311
![Alt text](./thumbnail.png?raw=true "Thumbnail")

Overview:

Our project aimed to highlight the poorly designed bike parking at ASU. To achieve this, we presented a data visualization of ASU’s student usage choice in bike racks, showed student testimonies on bike rack preferences, and showed the significant lock time increases associated with vertical bike racks in contrast to horizontal ones.
Data description
3 types of datasets were collected. One dataset for the waffle chart was collected where students gave their testimonies on the bike parking racks. 
The second dataset we collected has counts of the usage of the racks, both horizontal and vertical, and also counts of the wrong parked bike in vertical racks. The data was collected at different ASU buildings on different days and times. The other visualizations used this dataset to provide the information. Bike lock up times for horizontal and vertical bike racks were recorded to create the dial-like visualization.
The third data type was the time it takes to lock up a bike in vertical and horizontal bike racks. It was found that a bike without any bike bags took 27 seconds on the horizontal rack and 41 seconds on the vertical bike rack. A bike with panniers took 44 seconds on the horizontal racks and 1 minute and 28 seconds on the horizontal bike rack. This data was used to show how vertical bike racks have poor design from a usability perspective.

https://docs.google.com/spreadsheets/d/1mObjnJektdLclz9pY4eeWZ-7MFSFk47zMN5Ih-H6RoU/edit?usp=sharing

https://docs.google.com/spreadsheets/d/1-uo6bkzOH0Q3jN8xMk19-Bng7Br2tzM2r_Pzas0xMzE/edit?usp=sharing


Goals and Tasks

The task is to compare the usage of the vertical and horizontal bike racks. The visualization also shows peak and off-peak times for different locations and provides basic counts. The lock-up time justifies the point of the project by showing how long it takes to lock bikes in horizontal racks compared to vertical ones.

Idioms

Waffle Chart

For the Waffle Chart, the user is shown that there are “overwhelmingly” negative opinions towards the vertical bike racks among bike and electric scooter users with the colors.The users are allowed to explore the poll comments associated with the poll votes with mouseover to see the exact problems each individual bike rack user had with vertical bike racks or the positives that the few people who preferred vertical bike racks highlighted.

Item: (User Opinions) squares

Color: prefer vertical bike racks(green) vs horizontal bike racks(red)

Mouseover: Show comment and user school demographic(degree program).

![Alt text](./walle.png?raw=true "Waffle")

Spiral Arc Chart

For the time spiral arc chart, the user is shown the two locking times as arcs, with the pie arc showcasing the lockup time difference between horizontal and vertical bike racks. The user can then explore the effects of bike bags/ panniers, or no bike bags on the timings.
Possibly innovative since this is a different use of the d3 arc system typically used in pie and donut charts to instead showcase time like a stopwatch.

Item: (time) arcs/rings

Number of rings: number of minutes

Color: Horizontal/ Vertical rack categories (blue/red)

![Alt text](./spiral.png?raw=true "Spiral")

Mapped Time Data System

For the mapped time data system, the user is presented with a simple “Play” button to display the time based data system and begin the animation. The time based data system is on top of a segment of the ASU campus map, specifically focusing on Armstrong Hall. On top of that image is a dot on top of Armstrong Hall, and the data for each corresponding bike rack displayed next to the dot. Every couple of seconds, the circle will transition away and reappear with new data for a different time/day. This process repeats automatically until the data has been completely iterated over. Armstrong was chosen as that had the most data associated with it.

Possibly innovative since it combines mapping points with animations based on time.

Data Collection Times: shown based on time played in the video scaled.

Animation: Horizontal and vertical bike rack data appears over different recorded times

![Alt text](./map.png?raw=true "Map")

Pie Chart: 

For the pie chart, it shows three different categories for count function to compare the total count of park bikes in horizontal racks and total bikes parked in vertical racks and wrong parked bikes in vertical rack. The pink color area shows the bikes parked in horizontal racks. The blue area shows the count of bikes parked in the vertical rack and the orange part shows the vertical bikes parked wrong.

Item: Total counts of bike racks used among all locations

Color: Pink, blue, Orange

Mouseover: Shows the count for each bike parked category



![Alt text](./pie.png?raw=true "Pie")



Spider Chart

Shows vertical and horizontal bike rack usage based on location. Viewers can find details of the specific values with mouseover tooltip. Color is used to show the different kinds of racks.
Possibly innovative since it is a complex use of an already complicated spider chart with overlays and multiple categories and tooltips.

Item: Data points (locations)

Color: Vertical and Horizontal bike rack categories

Distance from Center: Count

Mouseover: Shows exact count value

![Alt text](./spider.png?raw=true "Spider")



Stacked bar chart:

Shows all three categories of bike parkings stacked on a bar chart where the x-axis represents the location while the y-axis represents the count of bikes parked. Viewers can find details of the specific value with mouseover tooltip. Colors are used to show different types of rack.

Items: Locations, counts and categories

Color: Vertical, horizontal and vertical parked wrong

Mouseover: Shows count value of each bike rack



![Alt text](./bar.png?raw=true "Bar")


Reflection

The project definitely got more simple as we worked on it. We had to adjust our expectations since we had to spend a lot more time than we anticipated on gathering our own data, which delayed our work on the visualizations.
I think the original project proposal would have been reasonable if we had data readily available before the project started.
Gathering user testimonies especially became hard for ken, since there were a few weeks when there were unfortunate encounters with aggressive drivers while cycling, which caused a temporary shift to public transit over cycling. Ken normally just preferred to chat with cyclists at the bike racks while locking bikes to get the user testimonies.
There was also some initial confusion over what bike rack locations would be more useful than others. This visualization really aimed to showcase how people prefer horizontal bike racks when both kinds of bike racks are available, so some amount of time was spent gathering data from certain locations that is not as relevant.
Next time coming with a game plan on data gathering and having more humble expectations of what we can make would likely work better.
A lot of the fade in scroll animations we thought we could do proved to be too complicated to implement.
We also found a stacked bar chart to be more informative than a line chart, so that changed from the original proposal as well.


Team Workload

Nupur Patel: For the visualization part, I worked on a stacked bar chart and a pie chart. I collected all the data from Armstrong hall, bulldog hall and Schwada building .

Michael Carpenter: Spider Chart+ assisted on cleanup of the spiral arc chart and other data vis. Got Palo Verde East and Centerpoint rack data.

Kenneth Wang: For the Visualization, I worked on a spiral arc chart to display the lock up times and also the waffle chart to display user testimonies/ opinions. I got the Noble Library Bike Rack Count Data, Light Rail Count Data, Personal Testimonies and Lock Timing Data.

Avery Langton: For the visualization, I worked on the heatmap to display bike rack data at peak times throughout the data collection process at Armstrong Hall. I collected all the data from the CAVC building bike racks.

