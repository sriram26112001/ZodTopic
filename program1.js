const express=require("express");
const zod=require("zod");
const app=express();

//now we will define the schema
const schema=zod.object({
    email:zod.string(),
    password:zod.string(),
    country:zod.union([zod.literal("US"),zod.literal("IND")]),
    kidneys:zod.array(zod.number())
});

app.use(express.json());

app.get("/health-checkup",function(req,res){
    const response=schema.safeParse(req.body);
    if(!response.success)
    {
        res.status(411).json({
            message:"Input validation failed",
            error: response.error.errors
        });
    }
    else
    {
        const kidneys=req.body.kidneys;
        let count=kidneys.length;
        console.log("you have "+count+" kidneys");
        res.json({
            message: "you have "+count+" kidneys",
            kidneys: kidneys
        });
    }
});

let port=3000;

app.listen(port,function()
{
    console.log("server is running on http://localhost:3000");
});