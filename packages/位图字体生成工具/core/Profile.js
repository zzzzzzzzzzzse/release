const Path=require("path"),Fs=require("fs"),FsExtra=require("fs-extra");class Profile{constructor(t){this.fileUrl=t,this.data={},this._read(t)}_read(t){Fs.existsSync(t)||Fs.writeFileSync(t,"{}","utf-8");let e=Fs.readFileSync(t,"utf-8"),r={};try{r=JSON.parse(e)}catch(t){r={}}this.data=r}save(){Fs.existsSync(this.fileUrl)&&Fs.writeFileSync(this.fileUrl,JSON.stringify(this.data,null,4),"utf-8")}}module.exports={get ProjectPath(){return Editor.Project&&Editor.Project.path?Editor.Project.path:Editor.projectInfo&&Editor.projectInfo.path?Editor.projectInfo.path:null},loadProjectCfg(t,e){let r=Path.join(this.ProjectPath,"settings",t);e(new Profile(r))}};