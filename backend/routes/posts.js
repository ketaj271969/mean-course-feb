const express = require("express");

const Post = require("../models/post");
const multer = require("multer");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

var HUBIAMRequest = require("request");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      console.log("This is Valid");
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename
    });
    post.save().then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    });

    //  Capture audit point for adding record
    var HUBIAMApplication = "mean-course-feb";
    var HUBIAMAppFunction = "posts.js - router.post - Add";
    var HUBIAMText = post.toString();
    var HUBIAMRequestEnvironment = "dev";

    HUBIAMRequest.post({
      headers: { "content-type": "application/json" },
      url: "http://idam-dev-con01.iamdev.lcl:14328/api/auditpoints",
      body: JSON.stringify({
        "application" : HUBIAMApplication,
        "appFunction" : HUBIAMAppFunction,
        "text" : HUBIAMText,
        "requestEnvironment" : HUBIAMRequestEnvironment
      })
    }, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
    });

  }
);

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    });

    //  Capture audit point when updating record
    var HUBIAMApplication = "mean-course-feb";
    var HUBIAMAppFunction = "posts.js - router.put - Update";
    var HUBIAMText = post.toString();
    var HUBIAMRequestEnvironment = "dev";

    HUBIAMRequest.post({
      headers: { "content-type": "application/json" },
      url: "http://idam-dev-con01.iamdev.lcl:14328/api/auditpoints",
      body: JSON.stringify({
        "application" : HUBIAMApplication,
        "appFunction" : HUBIAMAppFunction,
        "text" : HUBIAMText,
        "requestEnvironment" : HUBIAMRequestEnvironment
      })
    }, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
    });

    Post.updateOne({ _id: req.params.id }, post).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPosts,
      maxPosts: count
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log("post deleted");
    //  Capture audit point when deleting record
    var HUBIAMApplication = "mean-course-feb";
    var HUBIAMAppFunction = "posts.js - router.delete";
    var HUBIAMText = req.params.id;
    var HUBIAMRequestEnvironment = "dev";

    HUBIAMRequest.post({
      headers: { "content-type": "application/json" },
      url: "http://idam-dev-con01.iamdev.lcl:14328/api/auditpoints",
      body: JSON.stringify({
        "application" : HUBIAMApplication,
        "appFunction" : HUBIAMAppFunction,
        "text" : HUBIAMText,
        "requestEnvironment" : HUBIAMRequestEnvironment
      })
    }, (error, response, body) => {
      if(error) {
          return console.dir(error);
      }
    });
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
