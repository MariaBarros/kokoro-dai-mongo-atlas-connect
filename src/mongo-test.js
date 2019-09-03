const UserModel = require('./data/UserModel');

const RoleModel = require('./data/RoleModel');

const yellowColor = '\x1b[33m%s\x1b[0m';

let roleTest = {};

roleTest.getAll = async () =>{

  console.log(yellowColor, `\nGetting roles. Wait ...`);

  const __roleModel = await RoleModel();

  const roles = await __roleModel.find({});

  const count = await roles.count();

  if(count > 0){

    console.log(yellowColor, `\nRoles in the collection`);

    console.log(await roles.toArray());

  }  

  console.log(yellowColor, '\nFinish');

  process.exit(0);

}

roleTest.getAll();