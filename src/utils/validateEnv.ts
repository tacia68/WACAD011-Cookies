import { cleanEnv, port, str , num} from "envalid";
import bcrypt from 'bcryptjs';




function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str(),
    BCRYPT_ROUNDS : num(),
  });

}

export default validateEnv;
