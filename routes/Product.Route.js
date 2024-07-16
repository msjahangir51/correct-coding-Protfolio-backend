const multer = require("multer");
const { LatestProduct } = require("../model/ProjectsSchema");
const ProductRouter = require("express").Router();
const GetProductRouter = require("express").Router();
const deleteProjectRouter = require("express").Router();
GetProductRouter.get("/latestproductdata", async(req,res)=>{
    const project = await LatestProduct.find();
    res.status(220).send(project)
})

// latest product data


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname;
      cb(null, name)
    }
  })
  
  const upload = multer({ storage: storage })


ProductRouter.post("/latestproductdata", upload.single("file"),async (req,res)=>{
    // console.log(req.body)
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }

    const newProjects = new LatestProduct({
        name: obj.name,
        desc: obj.desc,
        live: obj.live,
        github: obj.github,
        image: req.file.filename
    })


    await newProjects.save().then((project)=>{
        res.status(200).send(project)
    }).catch(err => {
        console.log(err.message)
    })
})



deleteProjectRouter.delete("/product/:id",async(req,res)=>{
  try {
    const id = req.params.id;
    await LatestProduct.deleteOne({_id: id}).then(()=>{
      res.status(200).send({
        success: true,
        message:"Projects delete sucessfull"
      }).catch(err=>{
        res.status(404).send({
          success:false,
          message:"Projects delete failed"
        })

        
      })
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message: error.message
    })
  }
})



module.exports = {ProductRouter,GetProductRouter,deleteProjectRouter};