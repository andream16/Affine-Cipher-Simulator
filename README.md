###Javascript Affine Cipher Simulator

##What you need to run it
`node : ~7.5.0`

##How to use

`node affine-cipher.js encrypt/decrypt a b word`

#Where
 - `a` is an Integer Number coprime with m (26)
 - `b` is an Integer Number
 - `word` is a word with no spaces
 
 #How it works
 
  - If `a` and `m` are coprime
  - Ek(a,b)(n) = an + b mod m
  - Dk(y) = a^-1(y-b) mod m
  
  #Examples
  
   `node affine-cipher.js encrypt 5 8 affine` -> `ihhwvc`
   
   `node affine-cipher.js decrypt 5 8 ihhwvc` -> `affine`
