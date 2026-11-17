# Program 8: Execute Aggregation Pipeline and Text Search on Catalog Data Collection

## Overview
This program demonstrates how to create a **Text Index** on multiple fields in a MongoDB collection and execute an **Aggregation Pipeline** using the `$match` (with `$text` and `$search`) and `$project` (with `$meta: "textScore"`) stages to perform full-text search.

---

## Steps & MongoDB Commands

### Prelims
Start MongoDB Shell:
```bash
mongosh
```

### Step 1: Switch Database & Prepare Sample Data
```javascript
use product_catalog

db.catalog.insertMany([
  {
    item_id: "A001",
    name: "Classic Leather Backpack",
    description: "Durable leather backpack with multiple compartments, perfect for daily commute or light travel.",
    tags: ["leather", "backpack", "travel", "work"],
    price: 120.00,
    in_stock: true
  },
  {
    item_id: "A002",
    name: "Ergonomic Office Chair",
    description: "Adjustable office chair with lumbar support and breathable mesh, ideal for long working hours.",
    tags: ["office", "chair", "ergonomic", "comfort"],
    price: 280.00,
    in_stock: false
  },
  {
    item_id: "A003",
    name: "Durable Cotton T-Shirt",
    description: "A soft and durable t-shirt made from 100% organic cotton. Eco-friendly and comfortable.",
    tags: ["cotton", "tshirt", "organic", "eco-friendly"],
    price: 25.00,
    in_stock: true
  }
]);
```

### Step 2: Create a Text Index
A text index maps significant words in the fields to allow MongoDB to quickly perform text searches. A collection can have at most one text index.
```javascript
db.catalog.createIndex({
  name: "text",
  description: "text",
  tags: "text"
});
```

### Step 3: Build and Execute the Aggregation Pipeline
- **Stage 1 (`$match` with `$text`)**: Filters documents matching the search string `"durable backpack"` (searches for documents containing any space-separated words, i.e., OR condition).
- **Stage 2 (`$project`)**: Selects desired output fields and computes relevance score using `{ $meta: "textScore" }`.

```javascript
db.catalog.aggregate([
  // Stage 1: Filter documents using the text index
  {
    $match: {
      $text: {
        $search: "durable backpack"
      }
    }
  },
  // Stage 2: Reshape output and include the relevance score
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      score: { $meta: "textScore" }
    }
  }
]);
```

---

## Step 4: Expected Output

```json
[
  {
    "name": "Classic Leather Backpack",
    "price": 120,
    "score": 1.5
  },
  {
    "name": "Durable Cotton T-Shirt",
    "price": 25,
    "score": 0.75
  }
]
```
