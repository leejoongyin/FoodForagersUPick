import csv 
import json 


# Function to convert a CSV to JSON 
# Takes the file paths as arguments 
def make_json(csvFilePath, jsonFilePath): 
	
	# create a dictionary 
	data = {} 
	
	# Open a csv reader called DictReader 
	with open(csvFilePath, encoding='utf-8') as csvf: 
		csvReader = csv.DictReader(csvf) 
		
		# Convert each row into a dictionary 
		# and add it to data 
		for rows in csvReader: 
			
			# Assuming a column named 'No' to 
			# be the primary key 
			key = rows['name'] 
			data[key] = rows 

	# Open a json writer, and use the json.dumps() 
	# function to dump data 
	with open(jsonFilePath, 'w', encoding='utf-8') as jsonf: 
		jsonf.write(json.dumps(data, indent=4)) 
		
# Driver Code 

# Decide the two file paths according to your 
# computer system 
csvFilePath = r'RAW_recipes.csv'
jsonFilePath = r'recipes.json'

# Call the make_json function 
make_json(csvFilePath, jsonFilePath)



  // componentDidMount () {
  //   Papa.parse(myDataset, {
  //     download: true,
  //     delimiter: '\,',
  //     complete: this.updateRecipes
  //   });
  // }

  // updateRecipes (result)  {
  //   // const data = result.data;
  //   // this.setState({recipes: data});
  //   // alert("happening");
  //   // var i;
  //   // for(i = 1; i < (this.state.recipes).length; i++) {
  //   //   // STree.add(this.state.recipes[i][0],this.state.tree);
  //   //   console.log(this.state.recipes[i][0]);
  //   //   // this.setState({ map : this.state.map.set(this.state.recipes[i][0], this.state.recipes[i][5]) });
  //   //   this.state.map.set(this.state.recipes[i][0], this.state.recipes[i][5])
  //   // }    
  //   alert("tree no error");
  //   alert((this.state.recipes).length);
  //   alert("this is: ", this.state.map.get("all in the kitchen  chili"));
  // }