const express = require("express")
const sequelize = require("./config/database")
const noteRoutes = require("./routes/noteRoutes") 
const cors = require("cors") 
const app = express() 

app.use(cors({})) 
app.use(express.json()) 

app.get("/", (req, res) => {
    res.send("Testing testing")
}) 

require("./schema/Note")
app.use("/api/v1/notes", noteRoutes) 

const port = process.env.PORT || 3000 
sequelize.sync({alter:true}).then(() => {
    console.log("Database synced")
    app.listen(port, () => console.log(`Server running on port ${port}`))
})
