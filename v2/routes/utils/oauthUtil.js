var vAuth=0X01, vFirst=0X02, vLast=0X04, dev=false; 

function validateUser(userParam, isOauth){
    var ret = {"code":"", "_id":userParam.email};
    var code = 0X00;
    if (!ret._id)
        ret.code|=vAuth;
    else if (isOauth!="true" && !userParam.password)
        ret.code|=vAuth;
    if (!userParam.firstname)
        ret.code|=vFirst;
    if (!userParam.lastname)
        ret.code|=vLast;
    return ret;
}

function OauthMicro(){
    this.tockenUrl = "https://login.live.com/oauth20_token.srf",
    this.infoUrl = "https://apis.live.net/v5.0/me?access_token=",
    this.formData = {
        client_id : '000000004C11D509',
        redirect_uri: 'https://www.hozodo.com/oauth2callback',
        client_secret: 'xPh5sX3diTL4WDGwZUziONFjtJZOJHCY',
        code: "",
        grant_type: 'authorization_code'
    };
    this.initUrl = 'https://login.live.com/oauth20_authorize.srf?client_id='+this.formData.client_id
                            +'&scope=wl.basic,wl.emails&response_type=code&redirect_uri=' + this.formData.redirect_uri 
                            + "&state=";
}

function OauthFacebook(){
    this.tockenUrl = "https://login.live.com/oauth20_token.srf",
    this.infoUrl = "https://apis.live.net/v5.0/me?access_token=",
    this.formData = {
        client_id : '000000004C11D509',
        redirect_uri: 'https://www.hozodo.com/oauth2callback',
        client_secret: 'xPh5sX3diTL4WDGwZUziONFjtJZOJHCY',
        code: "",
        grant_type: 'authorization_code'
    };
    this.initUrl = 'https://www.facebook.com/dialog/oauth?client_id='+this.formData.client_id
                            +'&scope=public_profile,email&response_type=code&redirect_uri=' + this.formData.redirect_uri 
                            + "&state=";
}

function OauthGoogle(){
    this.tockenUrl = "https://accounts.google.com/o/oauth2/token",
    this.infoUrl = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=",
    this.formData = {
        client_id : '92942136470-l2rmi8lun2v485nslenk4e3dpebo60db.apps.googleusercontent.com',
        redirect_uri: 'https://www.hozodo.com/oauth2callback',
        client_secret: 'Zws5NT-L1XR6onyM6j2-Uq0F',
        code: "",
        grant_type: 'authorization_code'
    },
    this.initUrl = 'https://accounts.google.com/o/oauth2/auth?client_id='+this.formData.client_id
                            +'&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email&response_type=code'
                            + '&redirect_uri=' + this.formData.redirect_uri 
                            + "&approval_prompt=force&state=";
}

function OauthMicroPro(){
    this.tockenUrl = "https://login.live.com/oauth20_token.srf",
    this.infoUrl = "https://apis.live.net/v5.0/me?access_token=",
    this.formData = {
        client_id : '000000004411E046',
        redirect_uri: 'https://www.trazigo.com/oauth2callback',
        client_secret: 'CqkwchVlxBt4f2gG4JJCWPFsX--OIt2e',
        code: "",
        grant_type: 'authorization_code'
    };
    this.initUrl = 'https://login.live.com/oauth20_authorize.srf?client_id='+this.formData.client_id
                            +'&scope=wl.basic,wl.emails&response_type=code&redirect_uri=' + this.formData.redirect_uri 
                            + "&state=";
}

function OauthFacebookPro(){
    this.tockenUrl = "https://login.live.com/oauth20_token.srf",
    this.infoUrl = "https://apis.live.net/v5.0/me?access_token=",
    this.formData = {
        client_id : '1430750153855804',
        redirect_uri: 'https://www.trazigo.com/oauth2callback',
        client_secret: '0c24dce32233e41344b8f94629f459d9',
        code: "",
        grant_type: 'authorization_code'
    };
    this.initUrl = 'https://www.facebook.com/dialog/oauth?client_id='+this.formData.client_id
                            +'&scope=public_profile,email&response_type=code&redirect_uri=' + this.formData.redirect_uri 
                            + "&state=";
}

function OauthGooglePro(){
    this.tockenUrl = "https://accounts.google.com/o/oauth2/token",
    this.infoUrl = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=",
    this.formData = {
        client_id : '705814834843-uj0hkcckgs5on764vcaihcdf6m6h03ee.apps.googleusercontent.com',
        redirect_uri: 'https://www.trazigo.com/oauth2callback',
        client_secret: 'AFlU43y5oQ8H-VP96NA3KqPu',
        code: "",
        grant_type: 'authorization_code'
    },
    this.initUrl = 'https://accounts.google.com/o/oauth2/auth?client_id='+this.formData.client_id
                            +'&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email&response_type=code'
                            + '&redirect_uri=' + this.formData.redirect_uri 
                            + "&approval_prompt=force&state=";
}

function oauthObj(state){
    if (state){
        if (state.indexOf("google")!=-1)
            return dev?new OauthGoogle():new OauthGooglePro();
        else if (state.indexOf("microsoft")!=-1)
            return dev?new OauthMicro():new OauthMicroPro();
        else if (state.indexOf("facebook")!=-1)
            return dev?new OauthFacebook():new OauthFacebookPro();
        else return null;
    }else
        return null;
}

function getUserInfo(jsonData, state){
    if (jsonData && state){
        if (state.indexOf("google")!=-1)
            return {
                _id: jsonData.email,
                email: jsonData.email,
                firstname: jsonData.given_name,
                lastname: jsonData.family_name,
                locale: jsonData.locale
            };
        else if (state.indexOf("microsoft")!=-1)
            return {
                _id: jsonData.emails.account,
                email: jsonData.emails.account,
                firstname: jsonData.first_name,
                lastname: jsonData.last_name,
                locale: jsonData.locale
            };
        else if (state.indexOf("facebook")!=-1)
            return {
                _id: jsonData.email,
                email: jsonData.email?jsonData.email.replace('\u0040','@'):"",
                firstname: jsonData.first_name,
                lastname: jsonData.last_name,
                locale: jsonData.locale
            };
        else return {};
    }else
        return {};
}

exports.validateUser = validateUser;
exports.oauthObj = oauthObj;
exports.getUserInfo = getUserInfo;

if (dev){
    exports.OauthMicro = OauthMicro;
    exports.OauthFacebook = OauthFacebook;
    exports.OauthGoogle = OauthGoogle;
}else{
    exports.OauthMicro = OauthMicroPro;
    exports.OauthFacebook = OauthFacebookPro;
    exports.OauthGoogle = OauthGooglePro;
}

