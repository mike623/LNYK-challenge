import Post from './models/post';
import Project from './models/project';
import History from './models/history';

import Faker from 'faker';
import _ from 'underscore';
import lodash from 'lodash';



export default function () {
  // console.log('dummy start');
  // History.count().exec((err, count) => {
  //   console.log("History count",count);
  //   console.log("History count err",{err});
  //   const history = new History();
  //   history.type="asdas";
  //   history.save((err, saved)=>{
  //     console.log("History save",saved);
  //     console.log("History save err",{err});
  //   });
  // })

  Project.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    _.times(20,()=>{
      const project = new Project();
      project.name = Faker.Name.findName();
      project.title = Faker.Company.companyName();
      project.status = lodash.sample(['NEW',"PENDDING"]);
      project.dateAdded = lodash.sample(
        [
          (function(){return Faker.Date.past(2016)}()),
          (function(){return Faker.Date.future(2016)}()),
        ]
      );

      project.experts = (function(){
        const experts = [];
        _.times(5,()=>{
          experts.push({
            name: Faker.Name.findName(),
            description: Faker.Lorem.paragraphs(),
          })
        })
        return experts;
      }());

      project.save();
    })

  });
}
