import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as UserController from '../controllers/users.js';
import * as HistoryController from '../controllers/history.js';

import {transporter, mailOptions} from '../mail.js';

const router = new Router();



// Get all Posts
router.route('/getPosts').get(PostController.getPosts);
router.route('/getProjects').get(PostController.getProjects);

// Get one post by title
router.route('/getPost').get(PostController.getPost);
router.route('/getProject').get(PostController.getProject);

// Add a new Post
router.route('/addPost').post(PostController.addPost);

// Delete a Post
router.route('/deletePost').post(PostController.deletePost);

router.route('/testPost').get(function(req, res){console.log("success");res.status(200).end();});


router.route('/changeExpertStatus').post(PostController.changeExpertStatus);

router.route('/signup').post(UserController.postSignUp);
router.route('/login').post(UserController.postLogin);
router.route('/logout').post(UserController.postLogout);


router.route('/historyAdd').post(HistoryController.historyAdd);
router.route('/getHistories').get(HistoryController.getHistories);

router.route('/testMail').get((req, res)=>{


  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
  res.status(200).end();
});





export default router;
