import Post from '../models/post';
import Project from '../models/project';
import History from '../models/history.js';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

import {transporter, mailOptions} from '../mail.js';

export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
}

export function changeExpertStatus(req, res) {
  const {cuid, expertIndex, status } = req.body;

  const modi = {};
  modi[`experts.${expertIndex}.status`] = status;

  console.log({modi});

  Project.update({cuid},{$set:modi}).exec((err, project) => {
    if (err) {
      return res.status(500).send(err);
    }


    Project.where({cuid}).findOne((err, project)=>{
      const ex = project.experts[expertIndex];
      console.log({ex});
      console.log({project});

      const h = new History();

      h.projectName = project.name;
      h.expertName = ex.name;
      h.action = ex.status;

      h.save();


      mailOptions.subject = `Changed expert (${ex.name}) status in project (${project.name})`;
      mailOptions.html = `name: ${ex.name} changed to ${ex.status}`

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log(error);
          }
          console.log('Message sent: ' + info.response);
      });

    })

    res.status(200).end();
  });
}

export function getProjects(req, res) {

  Project.find().sort('-dateAdded').exec((err, projects) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ projects });
  });
}

export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ post: saved });
  });
}

export function getPost(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  Post.findOne({ cuid: newCuid }).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ post });
  });
}

export function getProject(req, res) {

  const cuid = req.query.cuid;
  console.log("getProject on server",{cuid});
  // const newSlug = req.query.slug.split('-');
  // const newCuid = newSlug[newSlug.length - 1];
  Project.findOne({ cuid }).exec((err, project) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ project });
  });
}

export function deletePost(req, res) {
  const postId = req.body.postId;
  Post.findById(postId).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
