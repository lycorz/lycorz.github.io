
const DEFAULT_URL = {}
if (process.env.NODE_ENV === 'production') {
    DEFAULT_URL.SF_REPORT_PATH = "http://192.168.0.254:8889/"
    DEFAULT_URL.IMG_UPLOAD_URL = "http://192.168.0.254:8889/api/XT/FileUpload"
    DEFAULT_URL.IMG_BASE_PATH = "http://192.168.0.254:8889/XT/User/Img/"
} else {
    DEFAULT_URL.IMG_UPLOAD_URL = "http://localhost:7417/api/XT/FileUpload"
    DEFAULT_URL.IMG_BASE_PATH = "http://localhost:7417/XT/User/Img/"
    DEFAULT_URL.SF_REPORT_PATH = "http://localhost:7417/"
} 

export default DEFAULT_URL