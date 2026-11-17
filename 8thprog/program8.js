// Program 8: Execute aggregation pipeline and its operation to illustrate text search on catalog data collection

// 1. Select / Switch to database
use product_catalog

// 2. Drop existing catalog collection if any
db.catalog.drop()

// 3. Step 1: Prepare Your Data Collection - Insert sample data
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
])

// 4. Step 2: Create a text Index on name, description, and tags fields
db.catalog.createIndex({
  name: "text",
  description: "text",
  tags: "text"
})

// 5. Step 3: Build and Execute the Aggregation Pipeline
// Stage 1: Filter documents matching "durable" or "backpack" using the text index
// Stage 2: Reshape output and retrieve relevance score using $meta: "textScore"
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
])
