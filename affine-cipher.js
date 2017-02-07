//Getting Args from console
var args = {
	"operation" : process.argv[2],
	"a"         : parseInt(process.argv[3]),
	"b"         : parseInt(process.argv[4]),
	"word"      : process.argv[5]      	      
};

var encryptedWord = [];
var decryptedWord = [];

if(!args.operation || !args.a || !args.b || !args.word){
	console.log("Arguments are missing, please, use: node \"encrypt/decrypt\" a b word");
	return;
} else {
	if(typeof args.a === 'number' || typeof args.b === 'number'){
		if(typeof args.word !== 'string'){
			console.log("Word must be a string");
			return;
		} else {
			// If a and m are coprimes
			if(gcdCalc(args.a, 26) === 1){
				if(args.operation === "encrypt"){
					encryptWord().then(function(encrWord){
						console.log("Word "+args.word+" got encrypted into "+encrWord);
					});
				} else if(args.operation === "decrypt"){
					decryptWord().then(function(decrWord){
						console.log("Ciphetext "+args.word+" got decrypted into "+decrWord);
					});
				} else {
					console.log("Invalid operation specified. Use encrypt or decrypt.");
				    return;
			    }
			} else {
				console.log("a "+args.a+ " and m 26 are not coprimes");
				return;
			}
		}	
	} else {
		console.log("You must assign an Integer number to a and b. Remember that a must be coprime with m (26)");
		return;
	}
}

function gcdCalc(a, b) {
    if (b) {
        return gcdCalc(b, a % b);
    } else {
        return Math.abs(a);
    }
};

function encryptWord(){
  return new Promise( function(resolve){
      var chars = args.word.split("");
      var currInt = 0;
      var currEnc = "";
      chars.forEach( function( currChar){
        currInt = parseInt(currChar, 36) - 10;
        // E(a,b)(n) = an + b mod 26
        currEnc = mod((args.a * currInt + args.b), 26);
        encryptedWord.push(String.fromCharCode(97 + currEnc));
      });
      return resolve(encryptedWord.join(""));	
   });
}

function decryptWord(){
  return new Promise( function(resolve){
    var chars = args.word.split("");
    var currInt = 0;
    var currEnc = "";
    //a^-1 = m - a
    var a_1 = 26 - args.a;
    chars.forEach( function( currChar){
        currInt = parseInt(currChar, 36) - 10;
        // D(y) = a^-1 * (y - b) mod 26
        currEnc = mod((a_1 * (currInt - args.b)), 26);
        decryptedWord.push(String.fromCharCode(97 + currEnc));
     }); 
     return resolve(decryptedWord.join(""));	
   });
}

function mod(n, m) {
    var remain = n % m;
    return Math.floor(remain >= 0 ? remain : remain + m);
};
