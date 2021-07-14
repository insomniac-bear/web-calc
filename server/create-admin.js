// Third party libraries
const bCrypt = require('bcryptjs');
const mongoose = require('mongoose');
// Schemas
const User = require('./schemas/user');
const Company = require('./schemas/company');
// Data services
const { findCompanyByName } = require('./data-service/company-service');
// Util functions
const { ExitCode } = require('./constants');

const uriDb = process.env.CONNECTION_STRING;
const COMPANY_NAME = process.env.COMPANY_NAME;
const ADMIN_LOGIN = process.env.ADMIN_LOGIN;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SALT = process.env.SALT;

const createAdmin = async () => {
  await mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });


  try {
    // Creae first company in system
    const myCompany = new Company({
      companyName: COMPANY_NAME,
    });
    await myCompany.save();
    console.log(`Company "${myCompany.companyName} was create`);

    // Create first user in system
    const hashedPassword = await bCrypt.hashSync(ADMIN_PASSWORD, Number(SALT));
    const company = await findCompanyByName(COMPANY_NAME);
    const myCompanyId = company._id;
    console.log(myCompanyId);
    const admin = new User({
      login: ADMIN_LOGIN,
      password: hashedPassword,
      role: 'admin',
      companyId: myCompanyId,
    });
    await admin.save();
    console.log('Admin user created');
    process.exit(ExitCode.SUCCESS);
  } catch (err) {
    console.log(err);
    process.exit(ExitCode.ERROR);
  }
};

createAdmin();
