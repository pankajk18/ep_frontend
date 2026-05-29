const mode = "prod"; // Change to "prod" for production

//used in blog
const UAT_LMS_API_URL = "https://api.crmpaisa.in/";
const UAT_BASE_API_URL = "https://microservices.crmpaisa.in/api/v1/"; //uat server.

//live
const PROD_BASE_API_URL = "https://microservices.crmpaisa.com/api/v1/"; //live server
const PROD_LMS_API_URL = "https://api.crmpaisa.com/";

//Blog
const IMAGE_BASE_URL = "https://crmpaisa.com/direct-document-file/";

const LMS_API_URL = mode === "prod" ? PROD_LMS_API_URL : UAT_LMS_API_URL;
const BASE_API_URL = mode === "prod" ? PROD_BASE_API_URL : UAT_BASE_API_URL;

export {
  LMS_API_URL,
  BASE_API_URL,
  UAT_LMS_API_URL,
  UAT_BASE_API_URL,
  PROD_BASE_API_URL,
  PROD_LMS_API_URL,
  IMAGE_BASE_URL,
};
