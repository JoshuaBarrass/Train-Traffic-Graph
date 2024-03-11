# Train Peak Graph Calculation

In this project, For any given area of train track, the concurent amount of trains in this area at any given point in time.
This must take into account if a train suspends opperations within this area, if a train enters and if a train leaves this area at another point that isn't the given start or end.

## Requirements

### Functional Requirements

- [ ] The program must be able to collate the data from some digital source
- [ ] The program must be able to calculate the amount of trains(units) in a given area at any given point in time
- [ ] The program must be able to output this data in excel format
- [ ] The program must be able to output this data in a graph format
- [ ] We must be able to see the size of the trains in 'units' e.g a 2 car train coupled to a 4 car train would be 2 units.
- [ ] If a train suspends opperations within this area, we must be able to see this in the graph
- [ ] if a train is stationary within this area for more than 20 minutes, we shouldn't be able to see this in the graph
- [ ] We sgould be able to see if a different column of data based on if the trains are passenger or non-passenger services
- [ ] We should have some list of the class of trains passing through this area

### Non-Functional Requirements e.g Usability, Reliability, Performance, Supportability, Security, etc.

- [ ] The program must be able to handle large amounts of data - a route that has > 100 stops between start and end stations selected
- [ ] Must allow the user to select any start and end stations
- [ ] Must allow the user to select any time period (Although defaulted to 24 hours)
- [ ] Must allow the user to select any day of the week (Although defaulted to Monday)

## Mathematical Model

For 2 given stations, Must find all the possible stops between these 2 stations.
For each stop, we must create a 'route' to ever other stop in the list. This will give us a cartesian product of all the possible routes between the 2 stations.
Using some digital API, we can then find the amount of trains that are in each of these routes at any given point in time.
We can then use this data to create a graph of the amount of trains in the area at any given point in time.

## Data models

### Train / units

- Train ID
- Train Class
- Train Length (In units)
- Train station entry
- Train station exit
- Train Entry Time
- Train Exit Time
- Was Suspended
- Train Route

