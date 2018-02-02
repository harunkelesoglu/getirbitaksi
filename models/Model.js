const mongoose = require("mongoose");
const config = require("./../config");
mongoose.connect(config.url)
        .then(()=> console.log("connected"))
        .catch((err) => console.log(err));
mongoose.Promise = Promise;
const Schema = mongoose.Schema;    
const Record = mongoose.model('Record',new Schema({}),'records')


module.exports.getRecord = (query) => {
        
   return Record.aggregate([
           {$match:{
                   createdAt:{
                           $gte:new Date(query.startDate),
                           $lte:new Date(query.endDate)
                        }
                }
           },
        {$project:{
                "totalCount":{$sum:"$counts"},
                "createdAt":1,
                "key":1,
                "_id":0}
        },
        {$match:{
                "totalCount":{
                        $gte:Number(query.minCount),
                        $lte:Number(query.maxCount)
                }
        }}]);
}