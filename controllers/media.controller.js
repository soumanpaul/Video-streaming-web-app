const _ = require("lodash");
const errorHandler = require("../helpers/dbErrorHandler");
const formidable = require("formidable");
const fs = require("fs");
const Media = require("../models/media.model");

//media streaming
const mongoose = require("mongoose");
//import Grid from 'gridfs-stream'
const Grid = require("gridfs-stream");
eval(
  `Grid.prototype.findOne = ${Grid.prototype.findOne
    .toString()
    .replace("nextObject", "next")}`
);
/* Until gridfs-stream module is updated */
Grid.mongo = mongoose.mongo;
let gridfs = null;

mongoose.connection.on("connected", () => {
  gridfs = Grid(mongoose.connection.db);
});

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded"
      });
    }
    let media = new Media(fields);
    media.postedBy = req.profile;
    if (files.video) {
      let writestream = gridfs.createWriteStream({ _id: media._id });
      fs.createReadStream(files.video.path).pipe(writestream);
    }
    media.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(result);
    });
  });
};

const mediaByID = (req, res, next, id) => {
  Media.findById(id)
    .populate("postedBy", "_id name")
    .exec((err, media) => {
      if (err || !media)
        return res.status("400").json({
          error: "Media not found"
        });
      req.media = media;
      next();
    });
};

const video = (req, res) => {
  gridfs.findOne(
    {
      _id: req.media._id
    },
    (err, file) => {
      if (err) {
        return res.status(400).send({
          error: errorHandler.getErrorMessage(err)
        });
      }
      if (!file) {
        return res.status(404).send({
          error: "No video found"
        });
      }

      if (req.headers["range"]) {
        let parts = req.headers["range"].replace(/bytes=/, "").split("-");
        let partialstart = parts[0];
        let partialend = parts[1];

        let start = parseInt(partialstart, 10);
        let end = partialend ? parseInt(partialend, 10) : file.length - 1;
        let chunksize = end - start + 1;

        res.writeHead(206, {
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Range": "bytes " + start + "-" + end + "/" + file.length,
          "Content-Type": file.contentType
        });

        gridfs
          .createReadStream({
            _id: file._id,
            range: {
              startPos: start,
              endPos: end
            }
          })
          .pipe(res);
      } else {
        res.header("Content-Length", file.length);
        res.header("Content-Type", file.contentType);

        gridfs
          .createReadStream({
            _id: file._id
          })
          .pipe(res);
      }
    }
  );
};

const listPopular = (req, res) => {
  Media.find({})
    .limit(10)
    .populate("postedBy", "_id name")
    .sort("-views")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(posts);
    });
};

const listByUser = (req, res) => {
  Media.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .sort("-created")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(posts);
    });
};

const read = (req, res) => {
  return res.json(req.media);
};

const incrementViews = (req, res, next) => {
  Media.findByIdAndUpdate(
    req.media._id,
    { $inc: { views: 1 } },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    next();
  });
};

const isPoster = (req, res, next) => {
  let isPoster =
    req.media && req.auth && req.media.postedBy._id == req.auth._id;
  if (!isPoster) {
    return res.status("403").json({
      error: "User is not authorized"
    });
  }
  next();
};
const update = (req, res, next) => {
  let media = req.media;
  media = _.extend(media, req.body);
  media.updated = Date.now();
  media.save(err => {
    if (err) {
      return res.status(400).send({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(media);
  });
};

const remove = (req, res, next) => {
  let media = req.media;
  media.remove((err, deletedMedia) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    gridfs.remove({ _id: req.media._id });
    res.json(deletedMedia);
  });
};

const listRelated = (req, res) => {
  Media.find({ _id: { $ne: req.media }, genre: req.media.genre })
    .limit(4)
    .sort("-views")
    .populate("postedBy", "_id name")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(posts);
    });
};

module.exports = {
  create,
  mediaByID,
  video,
  listPopular,
  listByUser,
  read,
  incrementViews,
  isPoster,
  update,
  remove,
  listRelated
};
