n = input("Number: ")

if int(n) > 0:
    print("N is greater than 0")
else:
    print("N is 0")

names = ["Harry", "Ron", "Hermione", "Ginny"]
names.append("Draco")
names.sort()
print(names)

class Flight(): #OOP Object-Oriented Programming
    def __init__(self, capacity):
        self.capacity = capacity
        self.passengers = []

    def add_passenger(self, name):
        if not self.open_seats():
            return False
        self.passengers.append(name)
        return True

    def open_seats(self):
        return self.capacity - len(self.passengers)

flight = Flight(3)
people = ["Harry", "Ron", "Hermione", "Ginny"]
for person in people:
    if flight.add_passenger(person):
        print(f"Added {person} to flight successfully.")
    else:
        print(f"No available seats for {person}")

def announce(f):
    def wrapper():
        print("About to run the function...")
        f()
        print("Done with the function.")
    return wrapper

@announce #Decorators
def hello():
    print("Hello, world!")

hello()

people = [
    {"name": "Harry", "house": "Gryffindor"},
    {"name": "Cho", "house": "Ravenclaw"},
    {"name": "Draco", "house": "Slytherin"}
]


#lambda a function, gets the name from person
people.sort(key=lambda person: person["name"])
print(people) # you can't sort the people variable becasue it doesn't know how