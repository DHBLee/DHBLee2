import time
import csv
import sys
import inflect

p = inflect.engine()
students = {}
subjects = {
        "Science Major": 6.00,
        "Science Minor": 3.00,
        "Calculus": 6.00,
        "Language and Literature": 5.50,
        "Language Acquisition": 2.00,
        "AI/ICT": 4.00,
        "Financial Literacy": 0.00,
        "Elective": 1.00,
        "EQ/ACT": 1.00,
        "PASS Research": 2.00,
          }

letter_equivalent = {
    "VS": 4.00,
    "S": 3.50,
    "AA": 3.00,
    "A": 2.50,
    "LA": 2.00,
    "P": 1.50,
}
class Get_GWA:
    def __init__(self, name, sum=0.0, list=None):
        if not name:
            raise ValueError("Missing name")
            sys.exit()
        self.name = name
        self.sum = sum
        self.list = []


    def produce_products(self):
        for subject, _ in subjects.items():
            ask = input(f"What is your letter grade in {subject}? ").upper()
            while ask.isnumeric() or ask not in ["VS", "S", "AA", "A", "LA", "P",]:
                ask = input(f"Please enter a valid letter grade. What is your letter grade in {subject}? ").upper()
            self.list.append(ask)


        for unit, value in zip(self.list, subjects):
            if unit in letter_equivalent:
                self.sum += letter_equivalent[unit] * subjects[value]


    def GWA(self):
        total_units = 0
        for i in subjects:
            total_units += subjects[i]
        final = self.sum / total_units
        final = float(f'{final:.2f}')
        return final
    def input_file(self, final):
        students["name"] = self.name
        students["GWA"] = f"{final}"
        with open('students.csv', 'a', newline='') as file:
            writer = csv.DictWriter(file, fieldnames=["name","GWA"])
            if file.tell() == 0:
                writer.writeheader()
            writer.writerow(students)

    def print(self, final):
        time.sleep(1)
        for _ in range(2):
            print(".", end="", flush=True)
            time.sleep(1)
        print(".", flush=True)
        time.sleep(1)
        print(f"Your General Weighted Average (GWA) is {final}")
        time.sleep(1)
        for _ in range(2):
            print(".", end="", flush=True)
            time.sleep(1)
        print(".", flush=True)
        time.sleep(1)
        if final >= 3.251 and final <= 3.50:
            print("You got a Pink certificate. Congrats!")
        elif final  >= 3.51 and final <= 3.750:
            print("You got a Purple Certificate. Congrats!")
        elif final >= 3.751 and final <= 4.00:
            print("You got a Green Certificate. Congrats!")
        else:
            print("Better luck next time!")




def remove_file(name):
    rows = []
    with  open('students.csv') as file:
        reader = csv.DictReader(file)
        fieldnames = reader.fieldnames
        for row in reader:
            if name.strip().lower() != row["name"].strip().lower():
                rows.append(row)

    with open('students.csv', 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
    print("All good!")


def know_top1():
    highest_GWA = 0.0
    highest_gwa_names = []
    with open('students.csv') as file:
        reader = csv.DictReader(file)
        for row in reader:
            gwa = float(row["GWA"])
            if gwa > highest_GWA:
                highest_GWA = gwa
                highest_gwa_names = [row["name"]]
            elif gwa == highest_GWA:
                highest_gwa_names.append(row["name"])


    if len(highest_gwa_names) > 1:
        list_of_names = p.join(highest_gwa_names)
        print(f"Its a tie bewtween {list_of_names} with a GWA of {highest_GWA}")
    else:
        print(f"The top 1 as of now is {highest_gwa_names}! with a GWA of {highest_GWA}.")


def main():
    ask = input("Good Day! What do you want to do? Know your GWA?(a) Remove your data?(b) Or know who's top 1?(c): ")
    if ask == "a":
        get = Get_GWA(input("What's your name? ").capitalize())
        get.produce_products()
        value = get.GWA()
        get.print(value)
        get.input_file(value)
    elif ask == "b":
        name = input("What's the name you want to remove?: ")
        remove_file(name)
    elif ask == "c":
        know_top1()
    else:
        sys.exit("Invalid Input.")






if __name__ == "__main__":
    main()
