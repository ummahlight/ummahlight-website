import fs from 'node:fs'; fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist');for(const file of ['index.html','style.css','app.js'])fs.copyFileSync(file,'dist/'+file);
