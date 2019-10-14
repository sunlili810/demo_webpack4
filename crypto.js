
//客户端代码
	//Now for test login
	var flag = Math.floor((Math.random() * 65536 * 65535)+1);
	var key1 = flag.toString(16);
	var key2 = 'claa2019';
    var username = "admin";
    var key  = CryptoJS.enc.Latin1.parse(key1 + key2);
    var iv   = CryptoJS.enc.Latin1.parse(key1 + key2);  
    //加密
    var encrypted = CryptoJS.AES.encrypt(username, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
    console.log('encrypted: ' + encrypted) ;
    //解密
    var decrypted = CryptoJS.AES.decrypt(encrypted,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
	console.log('decrypted: '+decrypted.toString(CryptoJS.enc.Utf8));
	

	var parameters = {
		"username": encrypted.toString()
	};

	var password = '1234567890abcdef';
	encrypted = CryptoJS.AES.encrypt(password, key, {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
	parameters.password = encrypted.toString();

	var appnonceKey  = CryptoJS.enc.Latin1.parse('claa2019claa2019');
	var appnonceIv   = CryptoJS.enc.Latin1.parse('claa2019claa2019');
	var encryptedAppnonce = CryptoJS.AES.encrypt(key1, appnonceKey, {iv:appnonceIv, mode:CryptoJS.mode.CBC, padding:CryptoJS.pad.ZeroPadding});
	
	parameters.appnonce = encryptedAppnonce.toString();
	var str = JSON.stringify(parameters);

	$.ajax({
		url: NodejsUrl + '/login',
		type: "post",
		data: {
			req: str
		},
		datatype: "json",
		success: function(data, textStatus) {
			alert(1);
		}
	});

//服务端代码
        var appnonceKey = CryptoJS.enc.Latin1.parse('claa2019claa2019');
        var appnonceIv  = CryptoJS.enc.Latin1.parse('claa2019claa2019');
        var decryptedAppnonce = CryptoJS.AES.decrypt(webCmd.appnonce, appnonceKey, {iv:appnonceIv, padding:CryptoJS.pad.ZeroPadding});
        var key1 = decryptedAppnonce.toString(CryptoJS.enc.Utf8);
        console.log('appnonce:' + key1);
        var key2 = 'claa2019';
        var key  = CryptoJS.enc.Latin1.parse(key1 + key2);
        var iv   = CryptoJS.enc.Latin1.parse(key1 + key2);  
        //解密
        var decrypted = CryptoJS.AES.decrypt(webCmd.username,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
        console.log('username: '+decrypted.toString(CryptoJS.enc.Utf8));
        decrypted = CryptoJS.AES.decrypt(webCmd.password,key,{iv:iv,padding:CryptoJS.pad.ZeroPadding});
        console.log('password: '+decrypted.toString(CryptoJS.enc.Utf8));

