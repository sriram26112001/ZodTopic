const zod=require("zod");

function validateArray(arr)
{
    const schema=zod.array(zod.number());
    const response=schema.safeParse(arr);
    console.log(response);
}
validateArray([1,2,3,4]);