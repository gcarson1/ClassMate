#Read input file
import sys
with open(sys.argv[1], 'r') as file: #Put in an argument (python automate_sql_add.py <input file>)
    data = file.read()

#Created for classtype so modify as needed
print("INSERT INTO [dbo].[ClassType] (ClassTypeID, ClassType, UniID)")
print("VALUES")
current_id = 1
for line in data.split(' '):
    if line != '':
        #remove whitespace from line
        line = line.strip()
        print(f"({current_id}, '{line}', 1),")
        current_id += 1
print("")