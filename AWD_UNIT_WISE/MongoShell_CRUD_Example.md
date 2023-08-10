These examples demonstrate how to perform Create, Read, Update, and Delete operations using different query and update operators.

Assuming you have MongoDB installed and running, you can open the MongoDB shell by running the `mongo` command in your terminal.

1. **Create (Insert)**:

```mongodb
// Insert a new document into the "people" collection
db.people.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com"
});

```

2. **Read (Find)**:

```mongodb
// Find all documents in the "people" collection
db.people.find();

// Find documents with specific conditions using query operators
db.people.find({ age: { $gte: 25 } });

// Find a single document by ID
const personId = ObjectId("your-person-id");
db.people.findOne({ _id: personId });

```

3. **Update**:

```mongodb
// Update a document by ID
const personIdToUpdate = ObjectId("your-person-id");
db.people.updateOne(
  { _id: personIdToUpdate },
  { $set: { age: 31, email: "updated@example.com" } }
);

```

4. **Delete**:

```mongodb
// Delete a document by ID
const personIdToDelete = ObjectId("your-person-id");
db.people.deleteOne({ _id: personIdToDelete });

```

These examples demonstrate basic CRUD operations using various query and update operators in the MongoDB shell.

Make sure to replace `"your-person-id"` and other values with actual data according to your database.



## Various Operator Examples

**Query Operators:**

1. **Comparison Operators:**

```mongodb
// Find documents where the age is greater than or equal to 25
db.people.find({ age: { $gte: 25 } });

// Find documents where the name is "John Doe" and the age is 30
db.people.find({ name: "John Doe", age: 30 });

```

2. **Logical Operators:**

```mongodb
// Find documents where the age is either 25 or 35
db.people.find({ $or: [{ age: 25 }, { age: 35 }] });

// Find documents where the name is "John Doe" and age is not 30
db.people.find({ name: "John Doe", age: { $ne: 30 } });

```

**Projection Operators:**

1. **Include Specific Fields:**

```mongodb
// Retrieve only the name and email fields
db.people.find({}, { name: 1, email: 1, _id: 0 });

// Retrieve the age and email fields, excluding _id
db.people.find({}, { age: 1, email: 1 });

```

2. **Exclude Specific Fields:**

```mongodb
// Retrieve all fields except the age field
db.people.find({}, { age: 0 });

```

3. **Array Projection:**

```mongodb
// Retrieve only the first element of the "hobbies" array
db.people.find({}, { "hobbies.0": 1 });

// Retrieve only the "name" field and the first two elements of the "hobbies" array
db.people.find({}, { name: 1, hobbies: { $slice: 2 } });

```

4. **ElemMatch Projection:**

```mongodb
// Retrieve documents with a hobby containing the name "Reading" and only show the matching hobby
db.people.find({ hobbies: { $elemMatch: { name: "Reading" } } }, { hobbies: { $elemMatch: { name: "Reading" } } });

```

These are just a few examples of how you can use MongoDB query and projection operators in the MongoDB shell.
